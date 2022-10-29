import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";
import { IconButton, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";

import { useMatchMedia } from "../../hooks/useMatchMedia";

import colleagueIcon from "../../imgs/colleagueIcon.png";
import familyIcon from "../../imgs/familyIcon.png";
import friendIcon from "../../imgs/friendIcon.png";
import { fetchDeleteContact } from "../../store/contactsSlice";
import { useAppDispatch } from "../../store/hooks";
import { ContactType } from "../../types/ContactType";
import { CustomizedSnackbar } from "../Utils/CustomizedSnackbar/CustomizedSnackbar";

import cl from "./Contact.module.scss";

export const Contact = ({ id, fullName, phone, type }: ContactType) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useAppDispatch();

  const { isMobile } = useMatchMedia();

  return (
    <div className={cl.contactWrapper}>
      <div className={cl.iconFullName}>
        <img className={cl.typeIcon} src={type === "family" ? familyIcon : type === "colleague" ? colleagueIcon : friendIcon} alt="" />
        <div className={cl.fullName}>{fullName}</div>
      </div>

      <div className={cl.phoneOptionsWrapper}>
        <CustomizedSnackbar originOfSnackbar={{ horizontal: "left", vertical: "bottom" }} message="Phone copied!" severity="success" autoHide={1500} open={openSnackbar} setOpen={setOpenSnackbar} />
        <div className={cl.phoneNumber}>{phone}</div>
        <Stack spacing={0.5} direction={"row"}>
          <IconButton
            onClick={() => {
              navigator.clipboard.writeText(phone.replace(/\D/g, "")).then(() => {
                setOpenSnackbar(true);
              });
            }}
            aria-label="copy"
            sx={{ padding: `${isMobile ? "5px" : "8px"}` }}
          >
            <ContentCopyIcon sx={{ fontSize: `${isMobile ? "1rem" : "1.5rem"} ` }} />
          </IconButton>
          <Link href={`tel:${phone}`}>
            <IconButton sx={{ padding: `${isMobile ? "5px" : "8px"}` }} aria-label="phone">
              <PhoneIcon sx={{ fontSize: `${isMobile ? "1rem" : "1.5rem"} ` }} />
            </IconButton>
          </Link>
        </Stack>
        <IconButton
          onClick={() => {
            dispatch(fetchDeleteContact(id!));
          }}
          className={cl.deleteButton}
          aria-label="delete"
          sx={{ padding: `${isMobile ? "5px" : "8px"}` }}
        >
          <DeleteIcon sx={{ fontSize: `${isMobile ? "1rem" : "1.5rem"} ` }} />
        </IconButton>
      </div>
    </div>
  );
};
