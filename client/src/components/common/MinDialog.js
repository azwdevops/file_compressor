// material ui items
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";

const MinDialog = (props) => {
  const handleBackdropClick = (e) => {
    // to ensure a user is able to click outside a dialog
    e.stopPropagation();
    return false;
  };
  return (
    <Draggable handle=".draggable-area">
      <Dialog
        open={props.isOpen}
        style={{
          maxWidth: props?.maxWidth,
          margin: "0 auto",
          maxHeight: "85vh",
        }}
        fullWidth
        hideBackdrop
        disableEnforceFocus
        disableBackdropClick
        onBackdropClick={handleBackdropClick}
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

export default MinDialog;
