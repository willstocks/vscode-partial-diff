import SelectionInfoBuilder from '../selection-info-builder';
import SelectionInfoRegistry from '../selection-info-registry';
import { TextKey } from '../const';

export default class SaveText1Command {
  private readonly _logger: Console;
  private readonly _selectionInfoBuilder: SelectionInfoBuilder;
  private readonly _selectionInfoRegistry: SelectionInfoRegistry;

  constructor (params) {
    this._logger = params.logger;
    this._selectionInfoBuilder = params.selectionInfoBuilder;
    this._selectionInfoRegistry = params.selectionInfoRegistry;
  }

  execute (editor) {
    try {
      const textInfo = this._selectionInfoBuilder.extract(editor);
      this._selectionInfoRegistry.set(TextKey.REGISTER1, textInfo);
    } catch (e) {
      this._handleError(e);
    }
  }

  private _handleError (e) {
    this._logger.error(e.stack);
  }
}