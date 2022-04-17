export const MessageDialog = ({children}) => {
  return <>
    <div className="dialog-overlay"></div>
    <div className="dialog-wrapper">
      {children}
    </div>
  </>
};