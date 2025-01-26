'use client'

import { cancelButton, createButton, issuer_roles, Meta, updateButton, validateButton } from "./data/meta"
import { RoleType, UserType } from "@/data/iam-scheme"
import { mapRolesToData } from "@/lib/mapping"
import { useEffect, useState } from "react"
import { handleLoadRoles } from "@/lib/db"
import { useToast } from "@/hooks/use-toast"
import TabItems from "@/components/iam/components/tab-items"

const TabRoles = ({meta}:{meta: Meta; }) => {
  const { toast, dismiss } = useToast();
  let toastId: string;

  const [metaForTabRoles, setMetaForTabRoles] = useState<Meta>();

  const renderToast = () => {
      let {id} = toast({title: "Roles", description: "loading ..."})
      toastId = id;
  }

  const rolesLoadedCallback = (_data: RoleType[]) => {
    let mappedRoles = mapRolesToData(_data);

    let createMode: boolean = (meta.subject === undefined);
    if (! createMode) {
      createMode = (meta.subject.id === 0);
    }

    meta.buttons = [validateButton, createMode ? createButton : updateButton, cancelButton]
    meta.items ? meta.items.issuer = issuer_roles : meta.items = {issuer: issuer_roles};
    meta.items ? meta.items.title = "Assign roles to user" : meta.items = {title: "Assign roles to user"};
    meta.items ? meta.items.columnname = "Roles" : meta.items = {columnname: "Roles"};
    meta.items ? meta.items.data = mappedRoles : meta.items = {data: mappedRoles};

    setMetaForTabRoles(meta);
    meta.changeMeta ? meta.changeMeta(meta) : (_meta: Meta) => {}

    dismiss(toastId);
  }

  useEffect(() => {
    renderToast();
    handleLoadRoles(rolesLoadedCallback);
  }, [])

  const renderComponent = () => {
    if (metaForTabRoles) {
      return (
        <TabItems meta={metaForTabRoles}/>
      );
    }

    return null;
  }

    return (<>{renderComponent()}</>)
  }

export default TabRoles