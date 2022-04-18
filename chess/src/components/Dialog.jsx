export const MessageDialog = ({children}) => {
  return <>
    <div className="dialog-overlay"></div>
    <div className="dialog-wrapper">
      {children}
    </div>
  </>
};

export const MenuDialog = ({children}) => {
  return <>
    <div className="dialog-overlay"></div>
    <div className="dialog-wrapper" style={{top: '100px', fontSize: '40px'}}>
      {children}
    </div>
  </>
};