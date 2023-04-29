import { Stack, Group, Text, List } from "@mantine/core"
import { TreatmentRecord } from "../../../schema/treatment"
import { useEffect } from "react"
import { RegularTable } from "../../list"


const TreatmentDetail = (props:{data:TreatmentRecord}) => {
  
    return (
        <>
        <Stack spacing={"sm"}>
            <Group>
                <Text weight="bolder" variant={"text"} size={"xl"}>
                Treatment History : {props.data.id}
                </Text>
            </Group>
            <Text><b>Tooth No. :</b> {props.data.tooth_no}</Text>
            <Text><b>Done on: </b>{props.data.date}</Text>
            <RegularTable columns={["Name","Cost"]} data={props.data.procedure}/>
        </Stack>
        </>
    )
}
export default TreatmentDetail;