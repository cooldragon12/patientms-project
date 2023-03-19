import { Group, Text } from "@mantine/core"

export const LabelText= (props) => {
    return (
        <Group spacing="sm">
            <Text weight={"bold"}>{props.label}</Text>
            <Text>
                {props.children}
            </Text>
        </Group>
    )
}