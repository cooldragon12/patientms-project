
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
 Table,
 NativeSelect,
 createStyles
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm, UseFormReturnType, } from "@mantine/form";
import Head from "next/head";

import { useState, useContext,useEffect } from "react";

import { OperationContext } from "../../@context/operation";
import { PatientFullInformation } from "../../schema/patient";
import { useDidUpdate } from "@mantine/hooks";


const useStyles = createStyles((theme) => ({
  table:{
    borderRadius: theme.radius.md,
    // "thead":{
      "tbody":{
        borderRadius: theme.radius.md,
          "td":{
            "div":{
              display:"flex",
              justifyContent:"center",
              alignContent:"center",

            }
          }
        },
        
    }
  }
))

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
  useEffect(()=>{
    console.log(form.values);
  },  [form.values]);
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

    {...form.getInputProps("hospitalization")}
   >
    <Group>
     <Radio value="yes" label="Yes" />
     <Radio value="no" label="No"  />
    </Group>
    <Collapse in={form.values.hospitalization === "yes"} transitionDuration={600}>
     <TextInput
      variant={"filled"}
      label="If so, when and why?"
      {...form.getInputProps("hospitalization_details")}
     />
    </Collapse>
   </Radio.Group>
   <Radio.Group
    label="Are you taking any prescription/non-prescription medication?"

    {...form.getInputProps("medication")}
    
   >
    <Group>
     <Radio value="yes" label="Yes" />
     <Radio value="no" label="No" />
    </Group>
    <Collapse in={form.values.medication === "yes"} transitionDuration={600}>
     <TextInput
      {...form.getInputProps("medication_details")}
      variant={"filled"}
      label="If so, please specify"
    
      
     />
    </Collapse>
   </Radio.Group>

   <Radio.Group
    label="Are you in medical treatment now?"
    {...form.getInputProps("current_treatment")}

   >
    <Group>
     <Radio value="yes" label="Yes" />
     <Radio value="no" label="No" />
    </Group>
    <Collapse in={form.values.current_treatment === "yes"} transitionDuration={600}>
     <TextInput
      {...form.getInputProps("current_treatment_details")}
      variant={"filled"}
      label="If so, what is the condition being treated?"
      defaultValue={"N/a"}

     />
    </Collapse>
   </Radio.Group>
   <Radio.Group
    label="Have you ever had serious illness or surgical operation?"
    
    {...form.getInputProps("isIllnessOrOperation")}
   >
    <Group>
     <Radio value="yes" label="Yes" />
     <Radio value="no" label="No" />
    </Group>
    <Collapse in={form.values.isIllnessOrOperation === "yes"} transitionDuration={600}>
     <TextInput
      
      variant={"filled"}
      label="If so, what illness or operation?"
      {...form.getInputProps("isIllnessOrOperation_details")}

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
      <Checkbox  label="Other" value="Other" />
      <Collapse in={form.values.allergies.includes("Other")} transitionDuration={600}>
        <TextInput disabled={!form.values.allergies.includes("Other")} {...form.getInputProps("other_allergy")} />
      </Collapse>
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
    {...form.getInputProps("blood_type")}
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
    {...form.getInputProps("hasCondition")}
   >
    <Group>
     <Radio value="yes" label="Yes" />
     <Radio value="no" label="No" />
    </Group>
    <Collapse in={form.values.hasCondition === "yes"} transitionDuration={600}>
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
        <Checkbox  label="Other" value="Other" />
        <Collapse in={form.values.conditions.includes("Other")} transitionDuration={600}>
        <TextInput disabled={!form.values.conditions.includes("Other")} {...form.getInputProps("other_condition")} />
        </Collapse>
       </Stack>
      </Group>
     </Checkbox.Group>
    </Collapse>
   </Radio.Group>
  </>
 );
};
const PageForm_3 = ({ form }) => {
  const upperTeeth = ["18", "17", "16", "15", "14", "13", "12", "11", "21", "22", "23", "24", "25", "26", "27", "28"];
  const lowerTeeth = ["48", "47", "46", "45", "44", "43", "42", "41", "31", "32", "33", "34", "35", "36", "37", "38"];
  const upperYoungTeeth = ["55", "54", "53", "52", "51", "61", "62", "63", "64", "65"];
  const lowerYoungTeeth = ["85", "84", "83", "82", "81", "71", "72", "73", "74", "75"];
  const {classes} = useStyles();
 return (<>
    <Title>Dentition Status</Title>
    <Stack>
      <Text>Teeth Statuses</Text>
            <Title size={20}>Adult Teeth</Title>
      <Table withBorder={true}  withColumnBorders={true}  className={classes.table}>
   
        <tbody>
          <tr >
          {
            upperTeeth.map((tooth, index) => {
              return (
                <td key={index}>
                  <div>

                  {tooth}
                  </div>
                </td>
              );
            })
          }
          </tr>
          <tr >
          {
            upperTeeth.map((tooth, index) => {
              return (
                <td key={index}>
                  <div>

                  <NativeSelect key={index} data={[]}/>
                  </div>
                </td>
              );
            })
          }
          </tr>
          <tr >
          {
            lowerTeeth.map((tooth, index) => {
              return (
                <td key={index}>
                  <div>

                  <NativeSelect key={index} data={[]}/>
                  </div>
                </td>
              );
            })
          }
          </tr>
          <tr >
          {
            lowerTeeth.map((tooth, index) => {
              return (
                <td key={index}>
                  <div>

                  {tooth}
                  </div>
                </td>
              );
            })
          }
          </tr>
        </tbody>
      </Table>
            <Title size={20}>Young Teeth</Title>
      <Table withBorder={true} withColumnBorders={true} className={classes.table}>
        
        <tbody>
          <tr >
          {
            upperYoungTeeth.map((tooth, index) => {
              return (
                <td key={index}>
                  <div>

                  {tooth}
                  </div>
                </td>
              );
            })
          }
          </tr>
          <tr >
          {
            upperYoungTeeth.map((tooth, index) => {
              return (
                <td key={index}>
                  <div>

                  <NativeSelect key={index} data={[]}/>
                  </div>
                </td>
              );
            })
          }
          </tr>
          <tr >
          {
            lowerYoungTeeth.map((tooth, index) => {
              return (
                <td key={index}>
                  <div>

                  <NativeSelect key={index} data={[]}/>
                  </div>
                </td>
              );
            })
          }
          </tr>
          <tr >
          {
            lowerYoungTeeth.map((tooth, index) => {
              return (
                <td key={index}>
                  <div>

                  {tooth}
                  </div>
                </td>
              );
            })
          }
          </tr>
        </tbody>
      </Table>
      
    </Stack>
 </>);
};

const AddPatientModal = () => {
  const [page, setPage] = useState(0);

  const { basic_form, dentition_form, medicalhistory_form} = useContext(OperationContext);
  
  const pages = [basic_form, medicalhistory_form, dentition_form]
 const conditionalComponent = () => {
  switch (page) {
   case 0:
    return <PageForm_1 form={basic_form} />;
   case 1:
    return <PageForm_2 form={medicalhistory_form} />;
   case 2:
    return <PageForm_3 form={dentition_form} />;
  }
 };
 useDidUpdate(() => {

 }, [page])
 return (
  <>
    <Head>
      <title>Add New Patient</title>
    </Head>
   <form >
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
        // disabled={!basic_form.isValid()}
        
        onClick={() => setPage(page + 1)}
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
