import { FloorplanMeta } from './FloorplanMeta';
import { Logger } from './Logger';
import { Cryptojs } from './Cryptojs';

interface DocumentMeta {
  magic: string;
}

interface DecodedDocument {
  meta: DocumentMeta;
  [key: string]: unknown;
}

type DocumentInput = string | DecodedDocument;

const LEGACY_MAGIC_VALUE = '61cd47b78148';

export const DocCrypto = {
  toDecodeContent: (
    documentInput: DocumentInput,
    decryptionKey?: string
  ): DecodedDocument | undefined => {
    let decodedDocument: DecodedDocument | undefined;

    try {
      decodedDocument =
        typeof documentInput === 'string'
          ? JSON.parse(documentInput)
          : documentInput;

      if (
        !decodedDocument ||
        ![FloorplanMeta.magic, LEGACY_MAGIC_VALUE].includes(
          decodedDocument.meta.magic
        )
      ) {
        throw new Error('invalid document');
      }

      return decodedDocument;
    } catch (error) {
      Logger.console.error(error, 'HSCore.ToDecodeContent');
    }

    Logger.console.log('Try to decrypt document');
    decodedDocument = undefined;

    try {
      if (decryptionKey) {
        const decryptedContent = Cryptojs.decodeDocument(
          decryptionKey,
          documentInput
        );
        decodedDocument = JSON.parse(decryptedContent);
      }
    } catch (error) {
      Logger.console.error(error, 'HSCore.ToDecodeContent');
    }

    return decodedDocument;
  }
};