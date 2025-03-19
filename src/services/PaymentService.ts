import conf from "@/helpers/conf";
import ApiResponse from "@/types/ApiResponse";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise: Stripe | null = await loadStripe(
	conf.stripe_publishable_key,
);

type itemsType = {
	items: {
		name: string;
		price: number;
		quantity: number;
		image: string;
		itemId: string;
	}[];
};

class PaymentService {
	private url: string;
	constructor() {
		this.url = `${conf.url}/api/payments`;
	}

	async createPayment(
		sessionId: string,
		userId: string | undefined,
	): Promise<ApiResponse> {
		try {
			const result = await axios.get(
				`${conf.url}/api/checkout-session?sessionId=${sessionId}`,
			);

			console.log("Payment service data: ", result.data);

			const res = await axios.post<ApiResponse>(this.url, {
				data: result.data.data,
				userId,
			});

			return res.data;
		} catch (err: any) {
			this.handleError({
				type: "createPayment",
				err,
			});
		}
	}

	async streamRefunds(): Promise<ApiResponse> {
		try {
			const result = await axios.get<ApiResponse>(
				`{conf.url}/api/refunds?action=streamRefunds`,
			);
			return result.data;
		} catch (err: any) {
			this.handleError({
				type: "streamRefunds",
				err,
			});
		}
	}

	async getRefundInfo(
		refundId: string,
	): Promise<ApiResponse> {
		try {
			const info = await axios.get<ApiResponse>(
				`${conf.url}/api/refunds?refundId=${refundId}`,
			);
			return info.data;
		} catch (err: any) {
			this.handleError({
				type: "getRefundInfo",
				err,
			});
		}
	}

	async createRefund(
		refundId: string,
	): Promise<ApiResponse> {
		try {
			const res = await axios.post<ApiResponse>(
				`${conf.url}/api/refunds`,
				{ refundId: refundId },
			);

			return res.data;
		} catch (err: any) {
			this.handleError({
				type: "createRefund",
				err,
			});
		}
	}

	async initiateCheckout({ items }: itemsType) {
		try {
			const stripe = stripePromise;

			const res = await fetch("/api/checkout-session", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ items }),
			});

			const { id } = await res.json();

			if (stripe) {
				const { error } = await stripe.redirectToCheckout({
					sessionId: id,
				});
				if (error) {
					console.error(
						"Stripe checkout error:",
						error.message,
					);
				}
			}
		} catch (err: any) {
			this.handleError({
				type: "initiateCheckout",
				err,
			});
		}
	}
	async updatePayment() {}
	async deletePayment(
		paymentId: string,
	): Promise<ApiResponse> {
		const res = await axios.delete(
			`${conf.url}/api/payments?paymentId=${paymentId}`,
		);

		return res.data;
	}

	async streamPayments(): Promise<ApiResponse> {
		try {
			const res = await axios.get<ApiResponse>(
				`${conf.url}/api/payments`,
			);
			return res.data;
		} catch (err: any) {
			this.handleError({
				type: "streamPayments",
				err,
			});
		}
	}

	async getPaymentIntent(
		paymentIntentId: string,
	): Promise<ApiResponse> {
		const res = await axios.get(
			`${conf.url}/api/payment-intent?paymentIntentId=${
				paymentIntentId
			}`,
		);
		return res.data;
	}

	private handleError({
		type,
		err,
	}: {
		type: string;
		err: Error;
	}): never {
		const consent = `${type} Error: ${err.message}`;
		console.log(consent);
		throw new Error(consent);
	}

	async getPayment() {}
	async queryPayment() {}
}

const paymentService = new PaymentService();
export default paymentService;
export { PaymentService };