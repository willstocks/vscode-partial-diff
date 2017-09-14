
const CompareSelectionWithClipboardCommand = require('../../../lib/commands/compare-selection-with-clipboard');

suite('CompareSelectionWithClipboardCommand', () => {

    test('it compares selected text with clipboard text', () => {
        const clipboard = {read: () => Promise.resolve('CLIPBOARD_TEXT')};
        const selectionInfoBuilder = {
            extract: stubWithArgs(['EDITOR'], {
                text: 'SELECTED_TEXT',
                fileName: 'FILENAME',
                lineRange: 'SELECTED_RANGE'
            })
        };
        const selectionInfoRegistry = {set: sinon.spy()};
        const diffPresenter = {takeDiff: sinon.spy()};
        const command = new CompareSelectionWithClipboardCommand({
            clipboard,
            diffPresenter,
            selectionInfoBuilder,
            selectionInfoRegistry
        });
        return command.execute('EDITOR').then(() => {
            expect(selectionInfoRegistry.set).to.have.been.calledWith(
                'clipboard',
                {
                    text: 'CLIPBOARD_TEXT',
                    fileName: 'Clipboard'
                }
            );
            expect(selectionInfoRegistry.set).to.have.been.calledWith(
                'reg2',
                {
                    text: 'SELECTED_TEXT',
                    fileName: 'FILENAME',
                    lineRange: 'SELECTED_RANGE'
                }
            );
            expect(diffPresenter.takeDiff).to.have.been.calledWith('clipboard', 'reg2');
        });
    });

    test('it prints callstack if error occurred', () => {
        const logger = {error: sinon.spy()};
        const command = new CompareSelectionWithClipboardCommand({logger});
        return command.execute('EDITOR').then(() => {
            expect(logger.error).to.have.been.called;
        });
    });

});