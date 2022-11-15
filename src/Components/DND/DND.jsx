import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Container } from "react-bootstrap";

const DND = (props) => {
	const { data, handleOnDragEnd } = props;

	return (
		<div>
			<Container>
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable droppableId="items">
						{(provided) => {
							return (
								<div {...provided.droppableProps} ref={provided.innerRef}>
									{data}
									{provided.placeholder}
								</div>
							);
						}}
					</Droppable>
				</DragDropContext>
			</Container>
		</div>
	);
};

export default DND;
