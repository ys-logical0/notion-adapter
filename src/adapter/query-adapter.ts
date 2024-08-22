import type { Client } from "@notionhq/client/build/src";
import type { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints";

export class QueryAdapter {
	constructor(private notion: Client) {}

	async queryDatabase(
		databaseId: string,
		filter?: QueryDatabaseParameters["filter"],
	) {
		const extract = async (
			d: string,
			f?: QueryDatabaseParameters["filter"],
			c?: string,
		) => {
			const databaseQuery = await this.notion.databases.query({
				database_id: d,
				filter: f,
				start_cursor: c,
			});
			const databaseResult = databaseQuery.results;

			if (databaseQuery.has_more && databaseQuery.next_cursor != null) {
				databaseResult.concat(await extract(d, f, databaseQuery.next_cursor));
			}
			return databaseResult;
		};
		return extract(databaseId, filter);
	}

	async listBlocks(pageId: string) {
		return await this.notion.blocks.children
			.list({ block_id: pageId })
			.catch((err) => {
				return null;
			});
	}

	async retrievePage(pageId: string) {
		return this.notion.pages.retrieve({ page_id: pageId }).catch((err) => {
			return null;
		});
	}
}
