import { useState } from 'react';
import Switch from 'react-switch';

const Tabs = ({ tabsContents, isDragging = false }) => {
	const [tabsContentData, setTabsContents] = useState(() => tabsContents);

	const handleTabClicked = (key) => {
		if (isDragging) return;

		setTabsContents((prevTabs) => {
			const newPrevTabs = prevTabs.map((prevTab) => {
				return {
					...prevTab,
					selected: prevTab.key === key ? true : false,
				};
			});
			return newPrevTabs;
		});
	};
	return (
		<div style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
			<div className='flex flex-col gap-4 flex-wrap items-center'>
				{tabsContentData.map((tab) => {
					if (tab.type === 'textSwitch') {
						return (
							<div
								key={tab.key}
								className='w-full flex-1 flex items-center justify-center'>
								<Switch
									checked={
										tabsContentData.find(
											(t) => t.key === tab.onTab
										)?.selected
									}
									onChange={(checked) =>
										handleTabClicked(
											checked ? tab.onTab : tab.offTab
										)
									}
								/>
							</div>
						);
					}
					return (
						<button
							key={tab.key}
							className={`border-2 border-solid px-2 py-4 min-w-[180px] flex-1 block transition-all duration-500 ${
								tab.selected
									? 'bg-white text-primary border-transparent'
									: 'bg-transparent text-white border-white hover:bg-white hover:text-primary hover:border-transparent'
							}`}
							onClick={() => handleTabClicked(tab.key)}>
							{tab.label}
						</button>
					);
				})}
			</div>

			<div>
				{tabsContentData?.map((tab) => {
					if (!tab.selected) {
						return null;
					}
					return (
						<button key={tab.key} className='px-2 py-4 flex-1'>
							{tab.children}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Tabs;
