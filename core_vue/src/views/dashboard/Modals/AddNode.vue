<template>
  <b-modal title="Add Node" v-model="myModal" @ok="handleOk()" @cancel="hide()" hide-header-close>
   <div>
      <template v-for='(stage, key1) in libHierarchy'>
        <b-form-group
          :label="key1"
          label-for="radios"
          :label-cols="3"
          :horizontal="true">
          <b-form-radio-group
            id="radios"
            name="radiosInline">
            <div v-for='(element, key2) in stage' class="custom-control custom-radio custom-control-inline">
              {{stage["name"]}}
              <input type="radio" :id=key2 name="radiosInline" class="custom-control-input" :value=JSON.stringify(element) :key1=key1 :key2=key2>
              
              <label class="custom-control-label" for="radiosInline">{{key2}}</label>
            </div>
          </b-form-radio-group>
        </b-form-group>
      </template>
    </div>
  </b-modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import $ from 'jquery'
import utils from '../_utils'

export default {
  name: 'addNode',
  data () {
    return {
      info: 'Asdf'
    }
  },
  computed: {
    ...mapGetters({
      visible: 'addNodeVisible',
      clickPos: 'cyClickPos',
      libHierarchy: 'libHierarchy',
      cy: 'cy'
    }),
    myModal: {
      get: function () {
        return this.visible
      },
      set: function (value) {
        if (value === true) {
          this.show()
        } else {
          this.hide()
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      show: 'showAddNode',
      hide: 'hideAddNode',
      shownext: 'showEditNode',
      setSelectedNodeId: 'setSelectedNodeId',
      setSelectedNodeElem: 'setSelectedNodeElem'
    }),
    handleOk: function () {
      let $selected = $('input[name=radiosInline]:checked')
      this.addNode(JSON.parse($selected.val()), $selected.attr('key1'), $selected.attr('key2'))

      let ele = document.getElementsByName('radiosInline')
      for (var i = 0; i < ele.length; i++) {
        ele[i].checked = false
      }

      this.hide()
      this.shownext()
    },
    addNode: function (elem, key1, key2) {
      console.log('addnode', elem, key1, key2)
      const name = key1 + ' : ' + key2
      var newNode = {}
      if (key2 === 'CSV' || key2 === 'Chemical') {
        newNode = {
          group: 'nodes',
          data: {id: utils.guid(), name: name, info: elem},
          style: {
            'content': 'data(name)',
            'text-opacity': 0.5,
            'text-valign': 'center',
            'text-halign': 'right',
            'background-color': '#000000'
          },
          position: {x: this.clickPos.x, y: this.clickPos.y}

        }
      }
      if (key2 === 'Dimensionality Reduction') {
        newNode = {
          group: 'nodes',
          data: {id: utils.guid(), name: name, info: elem},
          style: {
            'content': 'data(name)',
            'text-opacity': 0.5,
            'text-valign': 'center',
            'text-halign': 'right',
            'background-color': '#aa0000'
          },
          position: {x: this.clickPos.x, y: this.clickPos.y}

        }
      }
      if (key2 === 'Preprocessing' || key2 === 'Data Splitting') {
        newNode = {
          group: 'nodes',
          data: {id: utils.guid(), name: name, info: elem},
          style: {
            'content': 'data(name)',
            'text-opacity': 0.5,
            'text-valign': 'center',
            'text-halign': 'right',
            'background-color': '#0000aa'
          },
          position: {x: this.clickPos.x, y: this.clickPos.y}

        }
      }
      if (key2 === 'Linear' || key2 === 'Neural Network' || key2 === 'Support Vector Machines') {
        newNode = {
          group: 'nodes',
          data: {id: utils.guid(), name: name, info: elem},
          style: {
            'content': 'data(name)',
            'text-opacity': 0.5,
            'text-valign': 'center',
            'text-halign': 'right',
            'background-color': '#aaaa00'
          },
          position: {x: this.clickPos.x, y: this.clickPos.y}

        }
      }
      if (key2 === 'Selection' || key2 === 'Metrics') {
        newNode = {
          group: 'nodes',
          data: {id: utils.guid(), name: name, info: elem},
          style: {
            'content': 'data(name)',
            'text-opacity': 0.5,
            'text-valign': 'center',
            'text-halign': 'right',
            'background-color': '#00aa00'
          },
          position: {x: this.clickPos.x, y: this.clickPos.y}

        }
      }
      if (key2 === 'Store Plot' || key2 === 'Store Data') {
        newNode = {
          group: 'nodes',
          data: {id: utils.guid(), name: name, info: elem},
          style: {
            'content': 'data(name)',
            'text-opacity': 0.5,
            'text-valign': 'center',
            'text-halign': 'right',
            'background-color': '#aa00aa'
          },
          position: {x: this.clickPos.x, y: this.clickPos.y}

        }
      }

      this.setSelectedNodeId(newNode.data.id)
      this.setSelectedNodeElem(newNode)
      this.cy.add(newNode)
    }
  },
  mounted () {
    // this.show()
  }
}
</script>

<style scoped>
.custom-control-input{
  left: 2px;
  top: 6px;
  z-index: 1;
}
</style>
