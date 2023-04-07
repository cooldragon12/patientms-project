import { Stack, Text } from "@mantine/core"

export const LabelText= (props) => {
    return (
        <Stack spacing="xs">
            <Text weight={"normal"}>{props.label}</Text>
            <Text weight={"bold"}>
                {props.children}
            </Text>
        </Stack>
    )
}