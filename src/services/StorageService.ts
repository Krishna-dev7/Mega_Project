import conf from "@/helpers/conf";
import { Client, Storage, ID, Models } from "appwrite";

type bucketType = "avatar" | "product";

class StorageProvider {
	private client: Client;
	private storage: Storage;

	constructor() {
		this.client = new Client();
		console.log("Appwrite API key: ", conf.appwrite_apiKey);
		
		this.client
			.setEndpoint(conf.appwrite_apiKey!)
			.setProject(conf.appwrite_projectId!);

		this.storage = new Storage(this.client);
	}

	async storeImage({
		file,
		type = "avatar",
	}: {
		file: File;
		type: bucketType;
	}): Promise<Models.File> {
		try {
			const bucketId = this.getBucketId(type);

			return await this.storage.createFile(
				bucketId,
				ID.unique(),
				file,
			);
		} catch (err: any) {
			this.handleError({ type: "Store Image", err });
		}
	}
	async getImagePreview(
		type: "avatar" | "product",
		fileId: string,
	): Promise<URL> {
		try {
			const bucketId = this.getBucketId(type);
			return await this.storage.getFilePreview(
				bucketId,
				fileId,
			);
		} catch (err: any) {
			this.handleError({ type: "Image Preview", err });
		}
	}

	async retrieveImage(
		type: bucketType,
		fileId: string,
	): Promise<Models.File> {
		try {
			const bucketId = this.getBucketId(type);
			let res;
			return (res = await this.storage.getFile(
				bucketId,
				fileId,
			));
		} catch (err: any) {
			this.handleError({
				type: "Retrieve Image",
				err,
			});
		}
	}

	// updating images
	async changeImage(
		type: bucketType,
		file: File,
	): Promise<Models.File> {
		try {
			return await this.storeImage({
				file: file,
				type,
			});
		} catch (err: any) {
			this.handleError({ type: "Change Image", err });
		}
	}

	async deleteContent(type: bucketType, fileId: string) {
		try {
			const bucketId = this.getBucketId(type);
			return this.storage.deleteFile(bucketId, fileId);
		} catch (err: any) {
			this.handleError({ type: "Delete Content", err });
		}
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

	private getBucketId(type: bucketType): string {
		return type === "avatar"
			? conf.appwrite_avatar_bucketId!
			: conf.appwrite_images_bucketId!;
	}
}

const storageService = new StorageProvider();
export default storageService;
