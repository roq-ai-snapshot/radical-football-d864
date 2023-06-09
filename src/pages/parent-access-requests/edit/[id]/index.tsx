import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getParentAccessRequestById, updateParentAccessRequestById } from 'apiSdk/parent-access-requests';
import { Error } from 'components/error';
import { parentAccessRequestValidationSchema } from 'validationSchema/parent-access-requests';
import { ParentAccessRequestInterface } from 'interfaces/parent-access-request';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { ParentInterface } from 'interfaces/parent';
import { PlayerInterface } from 'interfaces/player';
import { getParents } from 'apiSdk/parents';
import { getPlayers } from 'apiSdk/players';

function ParentAccessRequestEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ParentAccessRequestInterface>(
    () => (id ? `/parent-access-requests/${id}` : null),
    () => getParentAccessRequestById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ParentAccessRequestInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateParentAccessRequestById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ParentAccessRequestInterface>({
    initialValues: data,
    validationSchema: parentAccessRequestValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Parent Access Request
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
              <FormLabel>Status</FormLabel>
              <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
              {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<ParentInterface>
              formik={formik}
              name={'parent_id'}
              label={'Select Parent'}
              placeholder={'Select Parent'}
              fetcher={getParents}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name as string}
                </option>
              )}
            />
            <AsyncSelect<PlayerInterface>
              formik={formik}
              name={'player_id'}
              label={'Select Player'}
              placeholder={'Select Player'}
              fetcher={getPlayers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name as string}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'parent_access_request',
  operation: AccessOperationEnum.UPDATE,
})(ParentAccessRequestEditPage);
