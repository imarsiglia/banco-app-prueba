import {useFormContext} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {InputDateForm} from '../../components/form/InputDateForm';
import {InputTextForm} from '../../components/form/InputTextForm';

type Props = {
  isEditing?: boolean;
};

export const FormProduct = ({isEditing = false}: Props) => {
  const {setValue, trigger} = useFormContext();

  function onChangeDateRelease(date: Date) {
    const newDate = new Date(date.getTime());
    newDate.setFullYear(newDate.getFullYear() + 1);
    setValue('date_revision', newDate);
    trigger('date_revision');
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{gap: 5}}>
      <InputTextForm currentId="id" label="ID" editable={!isEditing} />
      <InputTextForm currentId="name" label="Nombre" />
      <InputTextForm currentId="description" label="Descripción" />
      <InputTextForm currentId="logo" label="Logo" />
      <InputDateForm
        currentId="date_release"
        label="Fecha Liberación"
        onChangeValue={date => onChangeDateRelease(date)}
      />
      <InputDateForm
        currentId="date_revision"
        label="Fecha Revisión"
        editable={false}
      />
    </ScrollView>
  );
};
