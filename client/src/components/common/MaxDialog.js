// material ui items
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";

const MaxDialog = (props) => {
  const handleBackdropClick = (e) => {
    // to ensure a user is able to click outside a dialog
    e.stopPropagation();
    return false;
  };
  return (
    <Draggable handle=".draggable-area">
      <Dialog
        open={props.isOpen}
        maxWidth="lg"
        style={{
          maxWidth: "85vw",
          margin: "auto",
          maxHeight: "85vh",
          width: props?.width,
        }}
        fullScreen
        hideBackdrop
        disableEnforceFocus
        disableBackdropClick
        onBackdropClick={handleBackdropClick}
        PaperProps={{
          style: {
            boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
            backgroundColor: "#dfe4f0",
          },
        }}
      >
        {/* we use this to enable dragging of components */}
        <DialogTitle
          style={{ cursor: "move" }}
          classes={{ root: "draggable-area" }}
        ></DialogTitle>
        {props.children}
      </Dialog>
    </Draggable>
  );
};

export default MaxDialog;
