import { FormContainer } from "@/Components/forms/FormContainer";
import InputField from "@/Components/forms/InputField";
import { Section } from "@/Components/forms/Section";

export default function CreateEditPeserta() {
    return (
        <Section title="test">
            <FormContainer >
                <InputField
                    label="Nama"
                    name="nama"
                    placeholder="Nama"
                />
            </FormContainer>
        </Section>
    );
}
