'use client'

import PageBreadCrumbs from "@/components/ecafe/page-bread-crumbs";
import PageTitle from "@/components/ecafe/page-title";
import ManageGroupDialog from "../manage/manage-group-dialog";
import { useEffect, useRef, useState } from "react";
import { GroupType } from "@/data/iam-scheme";
import { useToast } from "@/hooks/use-toast";
import { Data, mapGroupsToData } from "@/lib/mapping";
import { CallbackFunctionDefault, CallbackFunctionSubjectLoaded } from "@/data/types";
import { columns } from "./table/colums";
import { action_delete } from "@/data/constants";
import { TableMeta } from "@tanstack/react-table";
import { DataTable } from "@/components/datatable/data-table";
import { DataTableToolbar } from "./table/data-table-toolbar";
import { handleDeleteGroup, handleLoadGroups } from "@/lib/db";

const GroupDetails = ({_selectedGroup}:{_selectedGroup: string | undefined}) => {
  const { toast, dismiss } = useToast();
  let toastId: string;

  const renderToast = () => {
    let {id} = toast({title: "Loading...", description: "Groups"})
    toastId = id;
  }

  const groups = useRef<GroupType[]>([]);
  const groupsLoaded = useRef<boolean>(false);
  const [groupsData, setGroupsData] = useState<Data[]>([]);
  
  const [group, setGroup] = useState<GroupType|undefined>();
  const [reload, setReload] = useState<number>(0);

  const groupsLoadedCallback = (data: GroupType[]) => {
    dismiss(toastId);

    groups.current = data;
    setGroupsData(mapGroupsToData(data, 2));
    groupsLoaded.current = true;
  }
  
  useEffect(() => {
    setGroup(undefined);
    renderToast();
    handleLoadGroups(groupsLoadedCallback);
  }, []);
  
  useEffect(() => {
    renderToast();
    handleLoadGroups(groupsLoadedCallback);
  }, [reload, setReload]);

  const handleReset = () => {
    setGroup(undefined);
  }

  const groupDeletedCallback = () => {
    setGroup(undefined);
    setReload((x:any) => x+1);
  }

  const updateGroup = (group: Data) => {
    setGroup(groups.current.find((_group) => _group.id === group.id));
    
    const button = document.getElementById("groupDialogButton");
    if (button !== null) {
      button.click();
    }
  }

  const handleAction = (action: string, group: Data) => {
    if (action === action_delete) {
      handleDeleteGroup(group.id, groupDeletedCallback);
    } else {
      updateGroup(group);
    }
  }

  const meta: TableMeta<Data[]> = {
    handleAction: handleAction,
  };

  const renderComponent = () => {
    return (
      <div>
        <PageBreadCrumbs crumbs={[{name: "iam"}, {name: "users", url: "/iam/groups"}]} />
        <PageTitle className="m-2" title={`Overview user groups`} />

        <div className="flex items-center justify-end">
          <ManageGroupDialog _enabled={groupsLoaded.current} group={group} handleReset={handleReset} setReload={setReload}/>
          {/* _enabled={true} user={user} handleReset={handleReset} setReload={setReload}/>  */}
        </div>
        <div className="block space-y-5">
          <DataTable data={groupsData} columns={columns} tablemeta={meta} Toolbar={DataTableToolbar} rowSelecting enableRowSelection={false}/>
        </div>
        </div>
      );
  }

  return (<>{renderComponent()}</>);
}

export default GroupDetails;