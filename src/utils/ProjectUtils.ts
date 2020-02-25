import _ from 'lodash'

const getNewName = (prefixStr:any, list:any) => {
  let nextName = `${prefixStr} (${list.length + 1})`

  let index = 0
  while (index <= list.length) {
    const candidateName = index === 0 ? prefixStr : `${prefixStr} (${index})`
    let isExist = false
    for (let i = 0; i < list.length; i++) {
      if (candidateName === list[i].name) {
        isExist = true;
        break
      }
    }

    if (!isExist) {
      nextName = candidateName
      break;
    }
    index++
  }
  return nextName
}

const reorder = (list:any, startIndex:any, endIndex:any) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getWorkapp = (dataType:any) => {
  switch (dataType) {
    case 'image':
      return 'image-default';
    default:
      return 'image-default'
  }
}


const convertToLabelInterface = (classList:any, groupList:any, categorization:any) => {
  const nextLabelInterface :any= {
    objects: convertToObjects(classList),
    groups: convertToGroups(groupList),
  }

  if (categorization) {
    nextLabelInterface.categorization = categorization
  }

  const indexOfKeypointClassItem :any= _.findIndex<any>(classList, classItem => classItem.type === 'Keypoint')
  if (indexOfKeypointClassItem !== -1) {
    const { name, keypointInterface, pointVisibility } = classList[indexOfKeypointClassItem]
    const { nodes, edges } :any= keypointInterface
    nextLabelInterface.keypointInterface = [{
      id: 'keypoint-id',
      name,
      edges,
      ...convertToNodeAndPointVisibility(nodes, pointVisibility)
    }]
  }

  return nextLabelInterface
}


const convertToObjects = (classList:any) => {
  const objects :any= []

  for (let i = 0; i < classList.length; i++) {
    const nextObject:any = {}
    const { name, color, type, propertyList, annotationCountRange } = classList[i]

    const convertedType = getAnnotationType(type)
    nextObject.name = name
    nextObject.info = {}
    nextObject.info.shapes = {}
    nextObject.info.shapes[convertedType] = {}
    nextObject.info.shapes[convertedType].defaultValue = {
      color
    }
    nextObject.info.properties = convertToProperties(propertyList)
    nextObject.info.min = annotationCountRange.min ? annotationCountRange.min : 0
    nextObject.info.max = annotationCountRange.max ? annotationCountRange.max : 0


    objects[i] = nextObject
  }

  return objects
}

const convertToProperties = (propertyList:any) => {
  const nextProperties :any= []
  for (let i = 0; i < propertyList.length; i++) {
    const nextProperty :any= {}
    const { name, type, required, options, isOnlyNumber }:any = propertyList[i]
    nextProperty.name = name
    if (type === 'Multiple Selection' || type === 'Multiple Choice') {
      nextProperty.type = 'objective'
      nextProperty.value = _.map(options, option => option.name)
      nextProperty.nullable = !required
      nextProperty.duplicated = type === 'Multiple Selection' ? true : false
      nextProperty.defaultValue = {
        value: _.map(_.filter(options, option => option.checked), option => option.name)
      }
    } else if (type === 'Free Response') {
      nextProperty.type = 'string'
      nextProperty.uniq = false
      nextProperty.defaultValue = {
        value: options
      }
      nextProperty.number = isOnlyNumber;
    }

    nextProperties[i] = nextProperty
  }

  return nextProperties
}

const convertToGroups = (groupList:any) => {
  const nextGroups :any= []
  for (let i = 0; i < groupList.length; i++) {
    const nextGroup:any = {}
    nextGroup.name = groupList[i].name
    nextGroup.info = {
      classes: groupList[i].classList
    }

    nextGroups[i] = nextGroup
  }
  return nextGroups
}

const convertToCategorization = (categorization:any) => {
  const words = []
  const wordMap = {}

  const categoryMap :any= {}
  for (let i = 0; i < categorization.wordMap.length; i++) {
    const word = categorization.wordMap[i]
    words[i] = {
      id: word.id,
      word: word.name
    }
    categoryMap[word.id] = word
  }

  traversalTree(categoryMap, 'root', wordMap)

  return {
    ...categorization,
    words,
    wordMap
  }
}

const traversalTree = (categoryMap:any, targetNodeId:any, map:any) => {
  const targetNode = categoryMap[targetNodeId]
  map[targetNodeId] = {
    id: targetNodeId
  }

  const { children } = targetNode
  if (children.length === 0) return map;

  for (let i = 0; i < children.length; i++) {
    const childId = children[i]
    traversalTree(categoryMap, childId, map[targetNodeId])
  }

  return map
}


const convertToNodeAndPointVisibility = (nodes:any, pointVisibility:any) => {
  const { state, type } = pointVisibility
  let v:any;
  const nextPointVisibility = []
  if (state === 2) {
    nextPointVisibility[0] = { name: 'not labeled', value: 0 }
    nextPointVisibility[1] = { name: 'labeled and visible', value: 1 }
    if (type === 'Visible') {
      v = 1
    } else if (type === 'Invisible') {
      v = 0
    }
  } else {

    nextPointVisibility[0] = { name: 'not labeled', value: 0 }
    nextPointVisibility[1] = { name: 'labeled but not visible', value: 1 }
    nextPointVisibility[2] = { name: 'labeled and visible', value: 2 }
    if (type === 'Visible') {
      v = 2
    } else if (type === 'Invisible but labeled') {
      v = 1
    } else if (type === 'Invisible') {
      v = 0
    }
  }


  return {
    nodes: _.map(nodes, node => ({ ...node, v })),
    pointVisibility: nextPointVisibility
  }
}

const getAnnotationType = (type:any) => {
  let nextType = ''
  switch (type) {
    case 'Polygon Segmentation':
      nextType = 'polygon'
      break;
    default:
      nextType = type.toLowerCase()
      break;
  }
  return nextType
}

const getShape = (object:any) => {
  return _.map(object.info.shapes, (value, key) => key)[0]
}

const getAnnotationTypes = (labelInterface:any) => {
  const types = []

  const { objects } = labelInterface

  _.forEach(objects, object => {
    _.forEach(object.info.shapes, (value, key) => {
      types.push(_.capitalize(getShape(object)))
    })
  })

  if (labelInterface.categorization) {
    types.push('Image Categorization');
  }

  return _.uniq(types).sort()
}


export default {
  getNewName, reorder, getWorkapp, convertToLabelInterface, getShape, getAnnotationTypes, convertToCategorization
}

