import { useSyncExternalStore } from "react";
import {
  dosyaContextStore,
  errorActions,
  stateActions,
  configActions,
} from "./context";
import { dosyaFilesStore, dosyaFilesActions } from "./files";
import { dosyaFiltersStore, filtersActions } from "./filters";
import { dosyaFoldersStore, foldersActions } from "./folders";
import { dosyaPreviewStore, previewActions } from "./preview";
import { dosyaUploaderStore, uploaderActions } from "./uploader";

export const useDosya = () => {
  const contextState = useSyncExternalStore(
    dosyaContextStore.subscribe,
    () => dosyaContextStore.state
  );
  const filesState = useSyncExternalStore(
    dosyaFilesStore.subscribe,
    () => dosyaFilesStore.state
  );
  const filtersState = useSyncExternalStore(
    dosyaFiltersStore.subscribe,
    () => dosyaFiltersStore.state
  );
  const foldersState = useSyncExternalStore(
    dosyaFoldersStore.subscribe,
    () => dosyaFoldersStore.state
  );
  const previewState = useSyncExternalStore(
    dosyaPreviewStore.subscribe,
    () => dosyaPreviewStore.state
  );
  const uploaderState = useSyncExternalStore(
    dosyaUploaderStore.subscribe,
    () => dosyaUploaderStore.state
  );

  return {
    context: {
      ...contextState,
      error: { ...contextState.error, ...errorActions },
      state: { ...contextState.state, ...stateActions },
      config: { ...contextState.config, ...configActions },
    },
    files: { ...filesState, ...dosyaFilesActions },
    filters: { ...filtersState, ...filtersActions },
    folders: { ...foldersState, ...foldersActions },
    preview: { ...previewState, ...previewActions },
    uploader: { ...uploaderState, ...uploaderActions },
  };
};
