
import {
 Group,
 Divider,
 NumberInput,
 Radio,
 Collapse,
 TextInput,
 Select,
 Title,
 Button,
 Text,
 Checkbox,
 Container,
 Modal,
 Stack,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, UseFormReturnType } from "@mantine/form";
import Head from "next/head";

import { useState, useContext,useEffect } from "react";

import { OperationContext } from "../../@context/operation";
import { PatientFullInformation } from "../../schema/patient";

const PageForm_1 = ({form}) => {
//  const [age, setAge] = useState<number>(0);

 return (
  <>
    <Title>Patient Registration</Title>
    <Text>Fill out the required fields. Here id the basic information you must fill out.</Text>
   <Group spacing={30}>
    <TextInput
     withAsterisk
     label="Last Name"
     placeholder="Last Name"
     {...form.getInputProps("last_name")}
    />
    <TextInput
     withAsterisk
     label="First Name"
     placeholder="First Name"
     {...form.getInputProps("first_name")}
    />
    <TextInput
     label="Middle Name"
     placeholder="Middle Name"
     {...form.getInputProps("middle_name")}
    />
   </Group>
   <Group >
    <Stack>
     <DateInput
      
      withAsterisk
      label="Birth Date"
      placeholder="Birth Day"
      defaultValue={new Date()}
      {...form.getInputProps("birthday")}
      dateParser={(input) => {
        if (input === 'today') {
          return new Date().toISOString();
        }
        return new Date(input);
      }}
     />
     <TextInput
      label="Occupation"
      placeholder="Occupation (Optional)"
      {...form.getInputProps("occupation")}
     />
     <TextInput
      label="Nickname"
      placeholder="Nickname (Optional)"
      {...form.getInputProps("nickname")}
     />
     <TextInput
      label="What is your reason for dental consultation?"
      placeholder="(Optional)"
      {...form.getInputProps("reason")}
     />
    </Stack>
    <Stack>
     <Select
      withAsterisk
      label="Sex"
      placeholder="Pick one"
      data={[
       { value: "male", label: "Male" },
       { value: "female", label: "Female" },
      ]}
      {...form.getInputProps("sex")}
     />
     <NumberInput
      withAsterisk
      type="number"
      label="Age"
      placeholder="Age"
      {...form.getInputProps("age")}
     />
     <Select
      withAsterisk
      label="Civil Status"
      placeholder="Pick one"
      data={[
       { value: "single", label: "Single" },
       { value: "married", label: "Married" },
       { value: "widowed", label: "Widowed" },
       { value: "separated", label: "Separated" },
       { value: "divorced", label: "Divorced" },
      ]}
      
      {...form.getInputProps("civil_status")}
     />
    </Stack>
   </Group>
   <Collapse
    title="Guardian information for Minors"
    in={form.values.age < 18 && form.values.age ? true : false}
    transitionTimingFunction="linear"
    transitionDuration={600}
   >
    <div>
     <TextInput
      label="Guardian Name"
      placeholder="Guardian Name"
      withAsterisk
      {...form.getInputProps("guardian_name")}
     />
     <TextInput
      label="Occupation of Guardian"
      placeholder="Occupation"
      {...form.getInputProps("guardian_occupation")}
     />
    </div>
   </Collapse>

   <Title size={16}>Contact Details</Title>
   <Group>
    <TextInput
     withAsterisk
     label="Mobile Number"
     placeholder="Mobile Number"
     {...form.getInputProps("mobile_number")}
    />
    <TextInput
     label="Email"
     placeholder="Email"
     {...form.getInputProps("email")}
    />
   </Group>

   <Title size={16}>Address</Title>
   <Group>
    <TextInput
     withAsterisk
     label="House no./Building no."
     {...form.getInputProps("building")}
    />
    <TextInput
     withAsterisk
     label="Street"
     placeholder="Street"
     {...form.getInputProps("street")}
    />
    <TextInput
     label="Village"
     placeholder="Village"
     {...form.getInputProps("village")}
    />
    <TextInput
     withAsterisk
     label="Barangay"
     placeholder="Barangay"
     {...form.getInputProps("barangay")}
    />
    <TextInput
     withAsterisk
     label="City"
     placeholder="City"
     {...form.getInputProps("city")}
    />
    <TextInput
     withAsterisk
     label="Province"
     placeholder="Province"
     {...form.getInputProps("province")}
    />
   </Group>
   <Divider />
  </>
 );
};
const PageForm_2 = ({ form }) => {
 const [openField, setOpenField] = useState([]);
 const toggle = (val, id) => {
  val === "yes"
   ? setOpenField((field) => [...field, id])
   : setOpenField((field) => field.filter((item) => item !== id));
 };
 return (
  <>
   <Title>Patient History</Title>
   <Text>Please put check if applicable.</Text>
   <Checkbox
    label="Are you in good health?"
    {...form.getInputProps("goodhealth")}
    checked={form.values.goodhealth}
   />
   <Checkbox
    label="Do you use tobacco products?"
    {...form.getInputProps("tobacco")}
    checked={form.values.tobacco}

   />
   <Checkbox
    label="Do you use alcohol, cocaine or other dangerous drugs?"
    {...form.getInputProps("isAlcoholOrDrugs")}
    checked={form.values.isAlcoholOrDrugs}

   />
   <Radio.Group
    label="Have you ever hospitalization?"
    onChange={(val) => toggle(val, 3)}
   >
    <Group>
     <Radio value="yes" label="Yes" />
     <Radio value="no" label="No" />
    </Group>
    <Collapse in={openField.includes(3)} transitionDuration={600}>
     <TextInput
      {...form.getInputProps("hospitalization")}
      variant={"filled"}
      label="If so, when and why?"
     />
    </Collapse>
   </Radio.Group>
   <Radio.Group
    label="Are you taking any prescription/non-prescription medication?"
    onChange={(val) => toggle(val, 4)}
   >
    <Group>
     <Radio value="yes" label="Yes" />
     <Radio value="no" label="No" />
    </Group>
    <Collapse in={openField.includes(4)} transitionDuration={600}>
     <TextInput
      {...form.getInputProps("medication")}
      variant={"filled"}
      label="If so, please specify"
     />
    </Collapse>
   </Radio.Group>

   <Radio.Group
    label="Are you in medical treatment now?"
    onChange={(val) => toggle(val, 1)}
   >
    <Group>
     <Radio value="yes" label="Yes" />
     <Radio value="no" label="No" />
    </Group>
    <Collapse in={openField.includes(1)} transitionDuration={600}>
     <TextInput
      {...form.getInputProps("current_treatment")}
      variant={"filled"}
      label="If so, what is the condition being treated?"
     />
    </Collapse>
   </Radio.Group>
   <Radio.Group
    label="Have you ever had serious illness or surgical operation?"
    onChange={(val) => toggle(val, 2)}
   >
    <Group>
     <Radio value="yes" label="Yes" />
     <Radio value="no" label="No" />
    </Group>
    <Collapse in={openField.includes(2)} transitionDuration={600}>
     <TextInput
      {...form.getInputProps("isIllnessOrOperation")}
      variant={"filled"}
      label="If so, what illness or operation?"
     />
    </Collapse>
   </Radio.Group>

   <Checkbox.Group
    label="Are you allergic to any of the following: (please check)"
    {...form.getInputProps("allergies")}
   >
    <Group>
     <Stack>
      <Checkbox
       label="Local Anesthetic (ex. Lidocaine)"
       value="Local Anesthetic"
      />
      <Checkbox label="Sulfa drugs" value="Sulfa drugs" />
      <Checkbox label="Penicillin, Antibiotics" value="Penicillin" />
     </Stack>
     <Stack>
      <Checkbox label="Aspirin" value="Aspirin" />
      <Checkbox label="Latex" value="Latex" />
     </Stack>
     <Stack>
      <TextInput  label="Other" />
     </Stack>
    </Group>
   </Checkbox.Group>
   <Select
    label="Blood Type"
    placeholder="Pick one"
    data={[
     { label: "A+", value: "A+" },
     { label: "A-", value: "A-" },
     { label: "B+", value: "B+" },
     { label: "B-", value: "B-" },
     { label: "AB+", value: "AB+" },
     { label: "AB-", value: "AB-" },
     { label: "O+", value: "O+" },
     { label: "O-", value: "O-" },
    ]}
    defaultValue={"A+"}
    {...form.getInputProps("civil_status")}
   />
   <Collapse
    title="For Women"
    in={form.values.sex === "female" ? true : false}
    transitionDuration={600}
   >
    <Group>
     <Text size={"md"} weight="bold">
      For Woman:
     </Text>
    
     <Checkbox label="Are you pregnant?" checked={form.values.pregnancy} {...form.getInputProps("pregnancy")} />
     <Checkbox label="Are you nursing" checked={form.values.nursing} {...form.getInputProps("nursing")} />
     <Checkbox
      label="Are you taking birth control?"
      {...form.getInputProps("birth_control")}
      checked={form.values.birth_control}
     />
    </Group>
   </Collapse>
   <Radio.Group
    label="Do you have or you had any conditions?"
    onChange={(val) => toggle(val, 5)}
   >
    <Group>
     <Radio value="yes" label="Yes" />
     <Radio value="no" label="No" />
    </Group>
    <Collapse in={openField.includes(5)} transitionDuration={600}>
     <Checkbox.Group
      label="If so, please check"
      {...form.getInputProps("conditions")}
     >
      <Group>
       <Stack>
        <Checkbox label="High Blood Pressure" value="High Blood Pressure" />
        <Checkbox label="Low Blood Pressure" value="Low Blood Pressure" />
        <Checkbox
         label="Epilepsy / Convulsions"
         value="Epilepsy / Convulsions"
        />
        <Checkbox label="AIDS or HIV Infection" value="AIDS or HIV Infection" />
        <Checkbox
         label="Sexually Transmitted Disease"
         value="Sexually Transmitted Disease"
        />
        <Checkbox
         label="Stomach Troubles / Ulcers"
         value="Stomach Troubles / Ulcers"
        />
        <Checkbox label="Fainting Seizure" value="Fainting Seizure" />
        <Checkbox label="Rapid Weight Loss" value="Rapid Weight Loss" />
        <Checkbox label="Radiation Therapy" value="Radiation Therapy" />
        <Checkbox
         label="Joint Replacement / Implant"
         value="Joint Replacement / Implant"
        />
        <Checkbox label="Heart Surgery" value="Heart Surgery" />
        <Checkbox label="Heart Attack" value="Heart Attack" />
        <Checkbox label="Thyroid Problem" value="Thyroid Problem" />
       </Stack>
       <Stack>
        <Checkbox label="Heart Disease" value="Heart Disease" />
        <Checkbox label="Heart Murmur" value="Heart Murmur" />
        <Checkbox
         label="Hepatitis / Liver Disease"
         value="Hepatitis / Liver Disease"
        />
        <Checkbox label="Rheumatic Fever" value="Rheumatic Fever" />
        <Checkbox label="Hay fever / Allergies" value="Hay fever / Allergies" />
        <Checkbox label="Respiratory Problems" value="Respiratory Problems" />
        <Checkbox label="Hepatitis / Juandice" value="Hepatitis / Juandice" />
        <Checkbox label="Tubercolosis" value="Tubercolosis" />
        <Checkbox label="Swollen Ankles" value="Swollen Ankles" />
        <Checkbox label="Kidney Disease" value="Kidney Disease" />
        <Checkbox label="Diabetes" value="Diabetes" />
        <Checkbox label="Chest Pain" value="Chest Pain" />
        <Checkbox label="Stroke" value="Stroke" />
       </Stack>
       <Stack>
        <Checkbox label="Cancer / Tumeos" value="Cancer / Tumeos" />
        <Checkbox label="Anemia" value="Anemia" />
        <Checkbox label="Angina" value="Angina" />
        <Checkbox label="Emphysema" value="Emphysema" />
        <Checkbox label="Asthma" value="Asthma" />
        <Checkbox label="Bleeding Problems" value="Bleeding Problems" />
        <Checkbox label="Blood Disease" value="Blood Disease" />
        <Checkbox label="Head injuries" value="Head injuries" />
        <Checkbox
         label="Arthritis / Rheumatism"
         value="Arthritis / Rheumatism"
        />
        <Checkbox label="Other" value="Other" />
       </Stack>
      </Group>
     </Checkbox.Group>
    </Collapse>
   </Radio.Group>
  </>
 );
};
const PageForm_3 = () => {
 return (<>
 
 </>);
};

const AddPatientModal = () => {
 const [page, setPage] = useState(0);

 const { form: patientForm} = useContext(OperationContext);

 const conditionalComponent = () => {
  switch (page) {
   case 0:
    return <PageForm_1 form={patientForm} />;
   case 1:
    return <PageForm_2 form={patientForm} />;
   case 2:
    return <PageForm_3 />;
  }
 };
 
 return (
  <>
    <Head>
      <title>Add New Patient</title>
    </Head>
   <form>
    <Stack
     sx={(theme) => ({
      paddingLeft: theme.spacing.xl,
      paddingRight: theme.spacing.xl,
     })}
    >
     {conditionalComponent()}

     <Group align={"flex-end"}>
      {page === 0 ? (
       <></>
      ) : (
       <Button onClick={() => setPage(page - 1)}>Back</Button>
      )}
      {page < 2 ? (
       <Button
        onClick={() => {
         patientForm.validate();
         setPage(page + 1);
        }}
       >
        Next
       </Button>
      ) : (
       <Button onClick={() => setPage(page + 1)}>Submit</Button>
      )}
     </Group>
    </Stack>
   </form>
  </>
 );
};

export default AddPatientModal;
