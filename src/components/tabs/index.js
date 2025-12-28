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
			<div
				className='text-fade-in mb-4'
				style={{
					textAlign: 'justify',
				}}>
				<p>
					My story starts with nerding out over computers and the
					internet at a young age. I started building my own PCs when
					I was about 16yo and even had my own computer repair and
					game computer building business for years. I eventually
					needed to learn marketing, and wound up working in marking
					for a number of years because I got hooked and spent most of
					my marketing career programming CRMs to automate marketing
					campaigns. Email, text messages, internal and external
					communications, I automated all of it in different CRMs.
				</p>
				<br />
				<p>
					I always had an interest in code, but never got beyond LAMP
					servers, HTML, CSS, and terminal commands for a long time.
					But I always figured I would make the transition from
					programming CRMs to programming websites and apps. So I
					decided to eventually go to OSU to get some computer science
					education.
				</p>
				<br />
				<p>
					I look forward to talking with you about a development or
					project management role you need filled!
				</p>
			</div>
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
