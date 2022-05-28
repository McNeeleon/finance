import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

export default function () {
	const store = useStore();

	const picked = ref('expense');

	const { handleSubmit } = useForm();

	const { value: selected, errorMessage: selectedError } = useField(
		'selected',
		yup.string().required()
	);

	const {
		value: amount,
		errorMessage: amountError,
		meta: amountMeta,
	} = useField(
		'amount',
		yup.number().typeError('Amount must be a number').required().min(0)
	);

	const {
		value: description,
		errorMessage: descriptionError,
		meta: descriptionMeta,
	} = useField('description', yup.string().required().trim().min(3));

	const countBill = () => {
		return picked.value === 'expense'
			? bill.value - amount.value
			: bill.value + amount.value;
	};

	const canCreateRecord = computed(() => {
		if (picked.value === 'income') {
			return true;
		}
		return bill.value >= amount.value;
	});

	const submitHandler = handleSubmit(async (values, { resetForm }) => {
		if (!canCreateRecord.value) {
			store.dispatch(
				'callMessage',
				{
					type: '',
					key: `Недостаточно средств на счете: ${amount.value - bill.value}`,
				},
				{ root: true }
			);
			return;
		}
		try {
			await store.dispatch('record/sendRecord', {
				categoryId: values.selected,
				type: picked.value,
				date: new Date().toJSON(),
				...values,
			});

			const newBill = countBill();

			await store.dispatch('info/updateBill', newBill);
			resetForm();

			store.dispatch(
				'callMessage',
				{ type: 'message', key: 'added' },
				{ root: true }
			);
		} catch {}
	});

	const bill = computed(() => store.getters['info/bill']);

	return {
		picked,
		selected,
		selectedError,

		amount,
		amountError,
		amountMeta,

		description,
		descriptionError,
		descriptionMeta,

		submitHandler,
	};
}
