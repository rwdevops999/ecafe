import { useToast } from "@/hooks/use-toast";
import { cancelButton, createButton, issuer_users, Meta, updateButton, validateButton } from "./data/meta";
import { useEffect, useState } from "react";
import { mapUsersToData } from "@/lib/mapping";
import { handleLoadUsers } from "@/lib/db";
import TabItems from "@/components/iam/components/tab-items";

const TabUsers = ({meta}:{meta: Meta;}) => {
  const { toast, dismiss } = useToast();
  let toastId: string;

  const [metaForTabUsers, setMetaForTabUsers] = useState<Meta>();

  const renderToast = () => {
      let {id} = toast({title: "Users", description: "loading ..."})
      toastId = id;
  }

  const usersLoadedCallback = (_data: UserType[]) => {
    let mappedUsers = mapUsersToData(_data);

    meta.buttons = [validateButton, (meta.group ? updateButton : createButton), cancelButton]
    meta.items ? meta.items.issuer = issuer_users : meta.items = {issuer: issuer_users};
    meta.items ? meta.items.title = "Assign users to group" : meta.items = {title: "Assign users to group"};
    meta.items ? meta.items.columnname = "Users" : meta.items = {columnname: "Users"};
    meta.items ? meta.items.data = mappedUsers : meta.items = {data: mappedUsers};

    setMetaForTabUsers(meta);
    meta.changeMeta ? meta.changeMeta(meta) : (_meta: Meta) => {}

    dismiss(toastId);
  }

  useEffect(() => {
    renderToast();
    handleLoadUsers(usersLoadedCallback);
  }, [])

  const renderComponent = () => {
    if (metaForTabUsers) {
      return (
        <TabItems meta={metaForTabUsers}/>
      );
    }

    return null;
  }

  return (<>{renderComponent()}</>);
}

export default TabUsers;