class Task {
	constructor(row) {
		// 表の内容に合わせて編集してください。
		this.title = row[0];
		this.tag = row[1];
		this.detail = row[2];

		// ここにデータベースのidを入れてください
		this.databaseId = '';

		// ここにトークンを入れてください
		this.token = '';
	}

	addNotion() {
		const url = 'https://api.notion.com/v1/pages';

		const content = {
			parent: {
				database_id: this.databaseId,
			},
			properties: {
        // ここもnotionに合わせて変更してください
				'名前': {
					title: [{text: {content: this.title}}],
				},
				'タグ': {
					multi_select: [{name: '開発'}],
				},
        '詳細': {
					title: [{text: {content: this.detail}}],
				},
			},
		};

		const options = {
			method: 'post',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${this.token}`,
				'Notion-Version': '2021-08-16',
			},
			payload: JSON.stringify(content),
		};
    
		UrlFetchApp.fetch(url, options);
	}
}