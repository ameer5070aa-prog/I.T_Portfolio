import { TinaEditProvider } from "tinacms/dist/edit-state";

interface TinaProviderProps {
  children: React.ReactNode;
}

export const TinaProvider = ({ children }: TinaProviderProps) => {
  return (
    <TinaEditProvider
      showEditButton={true}
      editMode={
        <div>
          <div id="tina-admin-container" style={{ minHeight: "100vh" }} />
        </div>
      }
    >
      {children}
    </TinaEditProvider>
  );
};
