import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import { ButtonView } from '@ckeditor/ckeditor5-ui'
import BookAddSvg from './BookAdd.svg'

export default class AddKnowledge extends Plugin {
	init () {
		const editor = this.editor
		editor.ui.componentFactory.add('addKnowledge', locale => {
			const view = new ButtonView(locale)

			view.set({
				label: '添加到知识库',
				icon: BookAddSvg,
				tooltip: true
			})

			view.on('execute', () => {
				const onAddKnowledge = this.editor.onAddKnowledge
				if (!(typeof onAddKnowledge === 'function')) return

				const selection = editor.model.document.selection
				const range = selection.getFirstRange();

				let text = ''
				for (const item of range.getItems()) {
					if (item.data) text += item.data //return the selected text
				}
				onAddKnowledge(text)
			})

			return view
		})
	}
}

