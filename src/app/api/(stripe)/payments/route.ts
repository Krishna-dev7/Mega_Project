import connectDB from "@/db/connect";
import conf from "@/helpers/conf";
import Payment, { IPayment } from "@/models/payment.models";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(conf.stripe_secret_key);
connectDB();

export async function GET(req: NextRequest) {
	try {

    const payments = await Payment.find();

		return NextResponse.json(
			{
				success: true,
				message: "retrieved payments",
				data: payments,
			},{ status: 200 },
		);
	} catch (err: any) {
		return NextResponse.json(
			{
				success: false,
				message: err.message || "someting went wrong",
			},{ status: 500 },
		);
	}
}

const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();
		const data: Stripe.Checkout.Session = body.data;
		const userId = body.userId;

		if (!data && !userId) {
			return NextResponse.json(
				{
					success: false,
					message: " didn't recieve payment data",
				},
				{ status: 400 },
			);
		}


		const alreadyExists = await Payment.findOne({
			sessionId: data.id
		})

		if(alreadyExists) {
			return NextResponse.json({
				success: false,
				message: 'payment already exists',
				data: alreadyExists
			}, {status: 400})
		}

		let invoice;
		if(data.invoice) {
			console.log('data.invoice: ', data.invoice);
			
		 invoice = await stripe.invoices.retrieve(
				data.invoice as string
			);
		}

		let paymentIntent;
		if(data.payment_intent) {
			paymentIntent = await stripe.paymentIntents
				.retrieve(data.payment_intent.toString())

		}

		const address = data
      .collected_information
      ?.shipping_details
      ?.address;

		console.log('invoice: ', invoice);

		const payment: IPayment = await Payment.create({
			userId,
			sessionId: data.id,
			paymentIntentId: data.payment_intent,
			invoiceId: data.invoice,
			invoice_url: invoice?.invoice_pdf,
			amount_total: data.amount_total,
			amount_subtotal: data.amount_subtotal,
			currency: data.currency,
			payment_status: data.payment_status,
			payment_intent_status: paymentIntent?.status,
			payment_date: data.created * 1000,
			shipping_details: {
				city: address?.city,
				country: address?.country,
				line1: address?.line1,
				line2: address?.line2,
				postal_code: address?.postal_code,
				state: address?.state,
				name: data.collected_information?.shipping_details
					?.name,
			},
			shipping_cost: data.shipping_cost,
      phone_number: data.customer_details?.phone,
      email: data.customer_details?.email,
		});

    return NextResponse.json({
      success: true,
      message: "payment created successfully",
      data: payment
    }, {status: 200})

	} catch (err: any) {
		return NextResponse.json(
			{
				success: false,
				message:
					err.message ||
					"someting went wrong in payment route",
			},{ status: 500 },
		);
	}
};

async function DELETE(req: NextRequest) {
	try {

		const {searchParams} = new URL(req.url)

		const paymentId = searchParams.get('paymentId')

		if(!paymentId) {
			return NextResponse.json(
				{
					success: false,
					message:"missing required params",
				},{ status: 500 },
			);
		}

		const deleted = await Payment
			.findByIdAndDelete(paymentId	)

		return NextResponse.json({
			success: true,
			message: 'deleted payment',
			data: deleted
		}, {status: 200})
		
	} catch (err:any) {
		return NextResponse.json(
			{
				success: false,
				message:
					err.message ||
					"someting went wrong in payment route",
			},{ status: 500 },
		);
	}
}


export {
	DELETE, POST
};
