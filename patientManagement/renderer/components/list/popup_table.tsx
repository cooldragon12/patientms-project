import React, { useEffect, useState } from "react";
import {
 Table,
 ScrollArea,
 createStyles,
 Menu,
 Checkbox,
 Button,
 UnstyledButton,
 Group,
 Skeleton,
 Text,
 Center,
 Modal,
} from "@mantine/core";
import { Patient } from "../../schema/patient";
import { useStyles } from ".";
import Link from "next/link";
import {
 IconChevronDown,
 IconChevronUp,
 IconDotsVertical,
 IconLink,
 IconSelector,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

function Th({ children, sorted, onSort, index, loading }) {
 const Icon = sorted ? IconChevronDown : IconChevronUp;
 return (
  <th>
   <UnstyledButton onClick={onSort}>
    <Skeleton visible={loading} radius="md">
     <Group position="apart">
      <Text fw={500} fz="sm">
       {children}
      </Text>
      <Center>
       <Icon size="0.9rem" stroke={1.5} />
      </Center>
     </Group>
    </Skeleton>
   </UnstyledButton>
  </th>
 );
}
export const PopUpTable = (
 {
  columns = [],
  data = [],
  empty_message = "",
  selection = [],
  setSelection,
  sortHandler,
  editHandler = () => {},
  ascending,
  sortBy,
  Content
 }
) => {
 const [scrolled, setScrolled] = useState(false);
 const [selectOpen, setSelectOpen] = useState(false);
 const [currentData, setCurrentData] = useState({});
 const [loading, setLoading] = useState(true);
 const [opened, {close, open}] = useDisclosure(false);
 // Data state
 // Style
 const { classes, cx } = useStyles();
 const toggleSelect = (id: string) => {
  setSelectOpen(true);

  toggleRow(id);
 };
 const toggleCancelSelect = () => {
  setSelectOpen(false);
  toggleDeselect();
 };
 const toggleDeselect = () => setSelection([]);

 const toggleRow = (id: string) => {
  setSelection((current) =>
   current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id]
  );
 };
 const toggleAll = () =>
  setSelection((current) =>
   current.length === data.length ? [] : data.map((item) => item.id)
  );
 const rows_skelelon = columns.map((row, index) => {
  return (
   <tr key={index + "-skeleton"}>
    {columns.map((column, index) => (
     <td key={"column-skeleton-" + index}>
      <Skeleton height={8} mt={7} radius="xl" />
     </td>
    ))}
   </tr>
  );
 });
 const rows = data.map((row, i) => {
  const keys = Object.keys(row);
  const selected = selection.includes(row.id);
  console.log(row)
  return (
    <>
    <tr
    key={row.id+i +"-row"}
    onDoubleClick={() => toggleSelect(row.id)}
    onClick={() => {
      if (selectOpen) toggleRow(row.id); 
    }}
    className={cx({ [classes.rowSelected]: selected })}
    >
    {keys.map((value, index) => {
      if (index < columns.length)
      return (
      <td onClick={()=>{setCurrentData(row); open()}} key={typeof row[value] == "object" && row[value] != null? row[value][0].label:row[value]+ "-data-row-"+index}>
        {typeof row[value] == "object" && row[value] != null? row[value][0].label:row[value]}
       </td>
      );
    })}
    {selectOpen ? (
      <td  key={row+"-data-selected"}>
      <Checkbox
       checked={selected}
       readOnly
       transitionDuration={0}
       radius="xl"
       />
     </td>
    ) : (
      <td key={row+"-data-unselected"} align="center">
      <Menu shadow="md" width={200}>
       <Menu.Target>
        <IconDotsVertical size={15} />
       </Menu.Target>

       <Menu.Dropdown>
        <Menu.Label>Operations</Menu.Label>
        <Menu.Item onClick={() => toggleSelect(row.id)}>Select</Menu.Item>
        <Menu.Item rightSection={<IconLink />} key={row.id + "-" + "link"}>
         Open
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={() => editHandler}>Edit</Menu.Item>
        {/* <Menu.Item onClick={() => deleteHandler}>Delete</Menu.Item> */}
       </Menu.Dropdown>
      </Menu>
     </td>
    )}
    
   </tr>
    </>
  );
 });
 useEffect(() => {
  setTimeout(() => setLoading(false), 500);
  // return ()=>{setTimeout(()=>setLoading(true), 500)}

  // setLoading(false);
 }, []);
 return (
  <ScrollArea h={600} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
    <Modal size={"xl"} key={"-modal"} opened={opened} onClose={close}>
        <Content key={"content"} data={currentData}/>
    </Modal>
   <Table
    withBorder={true}
    verticalSpacing="sm"
    horizontalSpacing="sm"
    className={classes.table}
   >
    <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
     <tr key={"Header-tratment"}>
      {columns.map((column, index) => (
       <Th
        key={column.value + "-header"}
        sorted={ascending ?? sortBy}
        index={column.value + "-" + index}
        loading={loading}
        onSort={() => sortHandler(column.value)}
       >
        {column.label}
       </Th>
      ))}
      {selectOpen ? (
       <th key={"checkbox" + 10} style={{ width: "13%" }}>
        <Group>
         <Checkbox
          onChange={toggleAll}
          checked={selection.length === data.length}
          indeterminate={
           selection.length > 0 && selection.length !== data.length
          }
          transitionDuration={0}
          radius="xl"
         />
         <UnstyledButton
          className={classes.sideButtonCheck}
          onClick={toggleCancelSelect}
         >
          Cancel
         </UnstyledButton>
        </Group>
       </th>
      ) : (
       <th key={"checkbox-not" + 10} style={{ width: "13%" }}></th>
      )}
     </tr>
    </thead>
    <tbody>{data && !loading ? rows : rows_skelelon}</tbody>
   </Table>
   {data.length === 0 ? (
    <div className={classes.emptyState}>
     <h2>{empty_message}</h2>
    </div>
   ) : (
    <></>
   )}
  </ScrollArea>
 );
};
