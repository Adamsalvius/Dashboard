import NewProjectForm from "../forms/newProject";
import {Box, Text, Button, Flex, HStack, SimpleGrid} from "@chakra-ui/react";
import { ModalType } from "./modalType";
export default function NewProjectModal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <Box m={0} background={"blackAlpha.100"} h={"100vh"} w={"100vw"} zIndex={"99999"} onClick={props.toggle}>
          <Box onClick={(e) => e.stopPropagation()} className="modal-box">
            <NewProjectForm isOpen={props.isOpen} toggle={props.toggle} />
          </Box>
        </Box>
      )}
    </>
  );
}
