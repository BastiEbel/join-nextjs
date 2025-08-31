import { stylesSelect } from "@/constants/selectbox-style";
import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  SingleValue,
} from "react-select";

type SelectBoxProps = {
  options?:
    | OptionsOrGroups<
        {
          value: string | undefined;
          label: string;
        },
        GroupBase<{
          value: string | undefined;
          label: string;
        }>
      >
    | undefined;
  value?:
    | { value: string | undefined; label: string }
    | { value: string | undefined; label: string }[]
    | null
    | undefined;
  placeholder: string;
  isMulti?: true | undefined;
  isSearchable: boolean;
  noOptionsMessage?: () => string;
  id: string;
  instanceId: string;
  onChange?:
    | ((
        newValue:
          | MultiValue<{
              value: string | undefined;
              label: string;
            }>
          | SingleValue<{
              value: string | undefined;
              label: string;
            }>,
        actionMeta: ActionMeta<{
          value: string | undefined;
          label: string;
        }>
      ) => void)
    | undefined;
};

export default function SelectBox({ ...props }: SelectBoxProps) {
  return (
    <Select
      instanceId={props.instanceId}
      id={props.id}
      value={props.value}
      options={props.options}
      onChange={props.onChange}
      placeholder={props.placeholder}
      isMulti={props.isMulti}
      styles={stylesSelect}
      isSearchable={props.isSearchable}
      noOptionsMessage={props.noOptionsMessage}
    />
  );
}
