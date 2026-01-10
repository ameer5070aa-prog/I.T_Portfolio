interface TinaProviderProps {
  children: React.ReactNode;
}

export const TinaProvider = ({ children }: TinaProviderProps) => {
  // Simple passthrough provider for now
  // TinaCMS admin panel works without this wrapper
  return <>{children}</>;
};
