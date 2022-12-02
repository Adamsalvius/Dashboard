import NewInvoiceForm from "../forms/newInvoice";
import {
  Box
} from "@chakra-ui/react";
import { ModalType } from "./modalType";
export default function NewInvoiceModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <Box className="modal-overlay" onClick={props.toggle}>
          <Box onClick={(e) => e.stopPropagation()} className="modal-box">
            <NewInvoiceForm isOpen={props.isOpen} toggle={props.toggle} />
          </Box>
        </Box>
      )}
    </>
  );
}
