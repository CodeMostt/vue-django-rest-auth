import _ from 'lodash'

function getEditNodeOnClickFunction (self) {
  return function (event) {
    let target = event.target || event.cyTarget
    let id = target.data().id
    let node = {
      group: 'nodes',
      data: self.cy.getElementById(id).data(),
      position: self.cy.getElementById(id).position()
    }
    self.$store.commit('setSelectedNodeId', id)
    self.$store.commit('setSelectedNodeElem', node)
    self.$store.commit('showEditNode')
  }
}

function getEditEdgeOnClickFunction (self) {
  return function (event) {
    let target = event.target || event.cyTarget
    let id = target.data().id
    let edge = {
      group: 'edges',
      data: self.cy.getElementById(id).data()
    }
    self.$store.commit('setSelectedEdge', edge)
    self.$store.commit('showEditEdge')
  }
}

function getRemoveNodeOnClickFunction (self) {
  return function (event) {
    let target = event.target || event.cyTarget
    let id = target.data().id
    self.cy.remove(self.cy.$id(id))
  }
}

function getRemoveEdgeOnClickFunction (self) {
  return function (event) {
    let target = event.target || event.cyTarget
    let id = target.data().id
    self.cy.remove(self.cy.$id(id))
  }
}

function getAddNodeOnClickFunction (self) {
  return function (event) {
    self.$store.commit('showAddNode')
    const pos = event.position || event.cyPosition
    self.$store.commit('setCyClickPos', { x: pos.x, y: pos.y })
  }
}

function getEdgeDropFunction (self) {
  return function (sourceNode, targetNode, addedEles) {
    // console.log('"from mere"')
    // console.log(sourceNode.data())
    // console.log(targetNode.data())
    console.log(addedEles.data())
    if (addedEles) {
      // console.log(addedEles.data().source + '-' + addedEles.data().target)
      // if (sourceNode.data().params.op.length === 0) {
      //   sourceNode.data().params.op.push({'name': 'obj'})
      // }
      // if (targetNode.data().params.inp.length === 0) {
      //   targetNode.data().params.inp.push({'name': 'obj'})
      // }
      console.log('source node data', sourceNode.data().params)
      console.log('target node data', targetNode.data().params)
      let sFunc = sourceNode.data().params.op
      let tFunc = targetNode.data().params.inp
      console.log('sfunc', sFunc)
      console.log('tfnc', tFunc)
      let edge = {
        group: 'edges',
        data: addedEles.data()
      }
      edge.data.inputs = _.cloneDeep(sFunc)
      edge.data.outputs = _.cloneDeep(tFunc)

      self.$store.commit('setSelectedEdge', edge)
      self.$store.commit('showEditEdge')
    }
  }
}

export default{
  getEditNodeOnClickFunction,
  getEditEdgeOnClickFunction,
  getRemoveNodeOnClickFunction,
  getRemoveEdgeOnClickFunction,
  getAddNodeOnClickFunction,
  getEdgeDropFunction
}
