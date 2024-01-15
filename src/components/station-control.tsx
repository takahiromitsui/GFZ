'use client';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Form,
	FormControl,
	FormField,
	FormLabel,
	FormMessage,
	FormItem,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { NetworkStationContext } from '@/store/network-station-context';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
	network: z.string(),
});

export default function StationControl() {
	const { networks, setCurrentNetwork } = useContext(NetworkStationContext);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});
	const handleSubmit = (values: z.infer<typeof FormSchema>) => {
		const network = networks.find(network => network.id === values.network);
		if (network) {
			setCurrentNetwork(network);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='network'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Network Code:</FormLabel>
							<Select onValueChange={field.onChange}>
								<FormControl>
									<SelectTrigger className='w-[300px]'>
										<SelectValue placeholder='All Networks' />
									</SelectTrigger>
								</FormControl>
								{/* Content */}
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Networks</SelectLabel>
										{networks.map((item, index) => {
											const { id, network, startTime, description } = item;
											const key = id;
											const startYear = new Date(startTime).getFullYear();
											const formattedString = `${network} (${startYear}) - ${description}`;
											return (
												<SelectItem key={key} value={id}>
													{formattedString}
												</SelectItem>
											);
										})}
									</SelectGroup>
								</SelectContent>
							</Select>
							{/* message */}
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Search</Button>
			</form>
		</Form>
	);
}
