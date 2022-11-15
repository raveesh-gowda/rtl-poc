import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";

import DND from "./DND";

const DNDContainer = () => {
	const [dndData, setDndData] = useState([
		{ id: 1, name: "India" },
		{ id: 2, name: "Australia" },
		{ id: 3, name: "England" },
		{ id: 4, name: "New Zealand" },
		{ id: 5, name: "South Africa" },
	]);

	const dataMap = dndData.map((ele, i) => {
		const { id, name } = ele;

		return (
			<Draggable key={id} draggableId={id.toString()} index={i}>
				{(provided) => {
					return (
						<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
							<Card style={{ width: "40%", padding: 50, margin: 20, textAlign: "center" }}>
								<h4>{name}</h4>
							</Card>
						</div>
					);
				}}
			</Draggable>
		);
	});

	const handleOnDragEnd = (res) => {
		const { destination, source } = res;

		const itemsCopy = [...dndData];

		const [reorderItems] = itemsCopy.splice(source.index, 1);
		itemsCopy.splice(destination.index, 0, reorderItems);

		setDndData(itemsCopy);
	};

	return (
		<div>
			<h3>DND - Drag & Drop</h3>
			<DND data={dataMap} handleOnDragEnd={handleOnDragEnd} />
		</div>
	);
};

export default DNDContainer;
