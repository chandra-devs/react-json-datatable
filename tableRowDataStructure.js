import React from "react"
import { ButtonGroup } from "@material-ui/core"
import { Button, Badge } from "reactstrap"
import moment from "moment"
import { BodyCell } from "./style"
import tableFunctions from "./TableFunctions"
import { map } from "lodash"
import { processUrl } from "./helper"
import { handler } from "./utils/api/handler"

export const getTableRowDataStructure = (row, tableRowDataStructure, structure, functions, externalValues) => {
	const rowsTId = (row, structure) => {
		let st = eval("row." + structure)
		return st ? st.toString() : ""
	}
	if (structure.onClick) {
		// console.log(functions.filter((func) => func.name == structure.onClick.function))
	}

	switch (structure.fieldType) {
		case "text":
			return <BodyCell key={structure.id}>{rowsTId(row, structure.id)}</BodyCell>
		case "link":
			return (
				<BodyCell key={structure.id}>
					{structure.onClick ? <span style={structure.style && structure.style} onClick={() => (structure.onClick.function ? functions.filter((func) => func.name == structure.onClick.function)[0].value(processUrl(structure.action.url, row, structure.action.params)) : null)}>{rowsTId(row, structure.id)}</span> : <a style={structure.style && structure.style} href={processUrl(structure.action.url, row, structure.action.params)}>{rowsTId(row, structure.id)}</a>}
				</BodyCell>
			)
		case "date_time":
			return <BodyCell key={structure.id}>{structure.format && row[structure.dependent] ? moment(structure.dependent ? row[structure.dependent] : row[structure.id]).format(structure.format) : ""}</BodyCell>
		case "date":
			return <BodyCell key={structure.id}>{structure.format && row[structure.dependent] ? moment(structure.dependent ? row[structure.dependent] : row[structure.id]).format(structure.format) : ""}</BodyCell>
		case "badge":
			return (
				<BodyCell key={structure.id}>
					{map(structure.items, (item) => {
						let mainConditions = structure.conditions
						let itemConditions = item.conditions
						let conditions = map(itemConditions, (condition) => mainConditions.filter((mainCondition) => mainCondition.id === condition)[0])
						let isDisabled = false
						let done = map(conditions, (condition) => {
							if (row[condition.key] !== condition.value) {
								isDisabled = true
							}
						})
						if (done) {
							if (isDisabled) {
								if (item.defaultShow) {
									return <Badge color={item.color}>{item.label}</Badge>
								}
							} else {
								return <Badge color={item.color}>{item.label}</Badge>
							}
						}
					})}
				</BodyCell>
			)
		case "href":
			return (
				<BodyCell key={structure.id}>
					<a style={structure.style} href={"https://google.com"}>
						{row[structure.id]}
					</a>
				</BodyCell>
			)
		case "button":
			return (
				<BodyCell key={structure.id}>
					<Button style={structure.style} href={structure.href} variant={structure.variant || "contained"} size={structure.size} onClick={() => !structure.onClick || tableFunctions.handleClick(tableRowDataStructure, row, structure)}>
						{structure.buttonLabel}
					</Button>
				</BodyCell>
			)
		case "multi-button":
			return (
				<BodyCell key={structure.id}>
					<ButtonGroup variant="contained" aria-label="outlined primary button group">
						{map(structure.items, (item) => {
							let mainConditions = structure.conditions
							let itemConditions = item.conditions
							let conditions = map(itemConditions, (condition) => mainConditions.filter((mainCondition) => mainCondition.id === condition)[0])
							let isDisabled = false
							let done = map(conditions, (condition) => {
								if (condition.dependent_type === "external") {
									// console.log("external", condition.value)
									if (externalValues[condition.key] !== condition.value) {
										isDisabled = true
									}
								} else if(condition.dependent_type === "api"){
									console.log("api", condition.value)
									condition.args.map(arg => {
										arg.value = row[arg.value]
									});
									handler(condition, (res) => {
										console.log(res)
									})

								}else {
									// console.log("internal", condition.value)
									if (typeof condition.value === "string") {
										// console.log("its string")
										if (condition.value.includes("!")) {
											// console.log("its string with exclamation")
											let condition_value = condition.value.replace("!", "")
											// console.log({condition_value})
											condition_value == "true" ? (condition_value = true) : (condition_value = false)
											if (row[condition.key] !== !condition_value) {
												isDisabled = true
											}
										} else {
											if (row[condition.key] !== condition.value) {
												isDisabled = true
											}
										}
									} else {
										if (row[condition.key] !== condition.value) {
											isDisabled = true
										}
									}
								}
							})
							if (done) {
								if (isDisabled) {
									if (item.defaultShow) {
										return (
											<span className={!isDisabled ? item.className : item.defaultClassName} disabled={isDisabled} key={item.label} style={item.style} href={item.href} variant={item.variant || "contained"} size={item.size}>
												{item.defaultIcon ? (
													<span>
														<i className={item.defaultIcon} aria-hidden="true"></i> {item.label}
													</span>
												) : (
													item.label
												)}
											</span>
										)
									} else {
										return null
									}
								} else {
									return (
										<span className={!isDisabled ? item.className : item.defaultClassName} disabled={isDisabled} key={item.label} style={item.style} href={item.href} variant={item.variant || "contained"} size={item.size} onClick={() => (item.onClick ? functions.filter((func) => func.name == item.onClick.function)[0].value(...item.onClick.args.map((item) => eval(item))) : null)}>
											{item.defaultIcon ? (
												<span>
													<i className={item.defaultIcon} aria-hidden="true"></i> {item.label}
												</span>
											) : (
												item.label
											)}
										</span>
									)
								}
							}
						})}
					</ButtonGroup>
				</BodyCell>
			)
		case "icon-actions":
			return (
				<BodyCell key={structure.id}>
					{map(structure.items, (item) => {
						return (
							<span
								key={item.icon}
								onClick={() => (item.onClick
									? functions.filter((func) => func.name == item.onClick.function)[0].value(...item.onClick.args.map((item) => eval(item)))
									: null)
								}
								style={item.style}
							>
								<i className={item.icon} aria-hidden="true"/>
							</span>
						)
					})}
				</BodyCell>				
			)

			
	}
}
