import DiffPresenter from '../diff-presenter';
import SelectionInfoBuilder from '../selection-info-builder';
import SelectionInfoRegistry from '../selection-info-registry';
import { TextKey } from '../const';

export default class CompareSelectionWithText1Command {
  private readonly _logger: Console;
  private readonly _diffPresenter: DiffPresenter;
  private readonly _selectionInfoBuilder: SelectionInfoBuilder;
  private readonly _selectionInfoRegistry: SelectionInfoRegistry;

  constructor (params) {
    this._logger = params.logger;
    this._diffPresenter = params.diffPresenter;
    this._selectionInfoBuilder = params.selectionInfoBuilder;
    this._selectionInfoRegistry = params.selectionInfoRegistry;
  }

  async execute (editor) {
    try {
      const textInfo = this._selectionInfoBuilder.extract(editor);
      this._selectionInfoRegistry.set(TextKey.REGISTER2, textInfo);

      await 'HACK'; // HACK: To avoid TextEditor has been disposed error
      await this._diffPresenter.takeDiff(TextKey.REGISTER1, TextKey.REGISTER2);
    } catch (e) {
      this._handleError(e);
    }
  }

  private _handleError (e) {
    this._logger.error(e.stack);
  }
}