import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export type StationControlProps = {
	network: string;
	description: string;
	startTime: string;
};

export default async function StationControl({
	props,
}: {
	props: StationControlProps[];
}) {
	return (
		<section>
			<h1 className='text-3xl font-bold mb-4'> Station Information</h1>
			<h1 className='text-3xl font-bold mb-4'> Network Code:</h1>
			<Select>
				<SelectTrigger className='w-[300px]'>
					<SelectValue placeholder='All Networks' />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Networks</SelectLabel>
						{props.map(item => {
							const startYear = new Date(item.startTime).getFullYear();
							const formattedString = `${item.network} (${startYear}) - ${item.description}`;
							return (
								<SelectItem
									key={item.network}
									value={item.network}
									// className='w-[300px] overflow-ellipsis whitespace-nowrap'
								>
									{formattedString}
								</SelectItem>
							);
						})}
					</SelectGroup>
				</SelectContent>
			</Select>
		</section>
	);
}
