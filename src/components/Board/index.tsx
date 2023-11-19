"use client"

import React, { useEffect, useState } from "react"

import { Draggable, DropResult, Droppable } from "react-beautiful-dnd"
import { cardsData } from "./rawdata"
import { DndContext } from "./DndContext"
import { NextPage } from "next"

interface Cards {
	id: number
	title: string
	components: {
		id: number
		name: string
	}[]
}
const TaskBoard: NextPage = () => {
	const [data, setData] = useState<Cards[] | []>([])
	const [isBrowser, setIsBrowser] = useState(false)

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result
		if (!destination) return
		if (source.droppableId !== destination.droppableId) {
			const newData = [...JSON.parse(JSON.stringify(data))] //shallow copy concept
			const oldDroppableIndex = newData.findIndex(
				(x) => x.id == source.droppableId.split("droppable")[1]
			)
			const newDroppableIndex = newData.findIndex(
				(x) => x.id == destination.droppableId.split("droppable")[1]
			)
			const [item] = newData[oldDroppableIndex].components.splice(
				source.index,
				1
			)
			newData[newDroppableIndex].components.splice(destination.index, 0, item)
			setData([...newData])
		} else {
			const newData = [...JSON.parse(JSON.stringify(data))] //shallow copy concept
			const droppableIndex = newData.findIndex(
				(x) => x.id == source.droppableId.split("droppable")[1]
			)
			const [item] = newData[droppableIndex].components.splice(source.index, 1)
			newData[droppableIndex].components.splice(destination.index, 0, item)
			setData([...newData])
		}
	}
	useEffect(() => {
		setData(cardsData)
		if (typeof window !== "undefined") {
			setIsBrowser(true)
		}
	}, [])
	if (!data.length) {
		return <h1>Loading</h1>
	}
	return (
		<div className="rounded-md border-2 border-primary w-full h-full p-3">
			<DndContext onDragEnd={onDragEnd}>
				<React.StrictMode>
					{isBrowser ? (
						<div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
							{data.map((val, index) => {
								return (
									<Droppable key={index} droppableId={`droppable${index}`}>
										{(provided) => (
											<div
												className="p-5 lg:w-1/3 w-full bg-white  border-gray-400 border border-dashed"
												{...provided.droppableProps}
												ref={provided.innerRef}
											>
												<h2 className="text-center font-bold mb-6 text-black">
													{val.title}
												</h2>
												{val.components?.map((component, index) => (
													<Draggable
														key={component.id}
														draggableId={component.id.toString()}
														index={index}
													>
														{(provided) => (
															<div
																className="bg-gray-200 mx-1 px-4 py-3 my-3"
																{...provided.dragHandleProps}
																{...provided.draggableProps}
																ref={provided.innerRef}
															>
																{component.name}
															</div>
														)}
													</Draggable>
												))}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
								)
							})}
						</div>
					) : null}
				</React.StrictMode>
			</DndContext>
		</div>
	)
}

export default TaskBoard