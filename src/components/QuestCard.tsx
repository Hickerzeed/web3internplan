import React from 'react';
import { Clock, ShieldAlert, Users } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import { CuberIcon } from './CuberIcon';
import { XPIcon } from './XPIcon';

interface QuestCardProps {
	quest: {
		title: string;
		protocol: string;
		logo: string;
		description?: string;
		duration?: string;
		status?: string;
		participants?: string;
		xp?: number;
		cubes?: number;
		difficulty?: string;
		tags: string[];
	};
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
	return (
		<CardContainer
			containerClassName='w-full h-full'
			className='w-full h-full'
		>
			<CardBody className='group bg-white dark:bg-[#161719] border border-gray-200 dark:border-white/5 rounded-[24px] overflow-hidden hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 cursor-pointer flex flex-col h-full w-full shadow-sm hover:shadow-md dark:shadow-none p-6 relative'>
				{/* Title & Status */}
				<CardItem
					translateZ='30'
					className='w-full flex-shrink-0'
				>
					<h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-orange-500 transition-colors'>
						{quest.title}
					</h3>

					<div className='flex flex-wrap items-center gap-2 mb-3'>
						<span
							className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
								quest.status === 'Ended'
									? 'bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400'
									: quest.status === 'Upcoming'
										? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
										: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
							}`}
						>
							{quest.status || 'Active'}
						</span>
						<span className='flex items-center gap-1 text-[11px] font-medium text-gray-500 dark:text-gray-400'>
							<Clock className='w-3 h-3' />
							{quest.duration || '7 Days Left'}
						</span>
					</div>

					<p className='text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed'>
						{quest.description ||
							'Complete this quest to earn rewards and learn more about the protocol ecosystem.'}
					</p>
				</CardItem>

				{/* 弹性间隔 - 推动footer到底部，保持固定位置 */}
				<div className='flex-1' />

				{/* Footer: Participants, Difficulty, Rewards - 固定在底部 */}
				<CardItem
					translateZ='20'
					className='w-full flex-shrink-0 pt-4 border-t border-gray-100 dark:border-white/5'
				>
					<div className='flex flex-col gap-px min-w-0'>
						<div className='flex items-center gap-2 min-w-0'>
							{/* Participants */}
							{quest.participants && (
								<div className='flex items-center gap-1.5 flex-shrink-0'>
									<div className='flex -space-x-3 flex-shrink-0'>
										<img
											src='https://picsum.photos/seed/p1/20/20'
											className='w-5 h-5 rounded-full border border-white dark:border-[#161719] flex-shrink-0 object-cover'
											alt='user'
										/>
										<img
											src='https://picsum.photos/seed/p2/20/20'
											className='w-5 h-5 rounded-full border border-white dark:border-[#161719] flex-shrink-0 object-cover'
											alt='user'
										/>
										<img
											src='https://picsum.photos/seed/p3/20/20'
											className='w-5 h-5 rounded-full border border-white dark:border-[#161719] flex-shrink-0 object-cover'
											alt='user'
										/>
									</div>
									<span className='text-xs font-bold text-gray-900 dark:text-white'>
										{quest.participants}
									</span>
								</div>
							)}
							{/* Difficulty */}
							<div className='flex items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 min-w-0'>
								<ShieldAlert className='w-3.5 h-3.5' />
								{quest.difficulty || 'Medium'}
							</div>
						</div>
						<div className='flex items-center justify-start min-w-0'>
							{/* Rewards */}
							<div className='flex items-center gap-3 flex-shrink-0'>
								{quest.xp && (
									<div className='flex items-center gap-2'>
										<XPIcon className='w-4 h-4' />
										<span className='text-xs font-bold text-gray-900 dark:text-white'>
											{quest.xp}
										</span>
									</div>
								)}
								{quest.cubes && (
									<div className='flex items-center'>
										<CuberIcon className='w-8 h-8' />
										<span className='text-xs font-bold text-gray-900 dark:text-white'>
											{quest.cubes}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>
				</CardItem>
			</CardBody>
		</CardContainer>
	);
};
