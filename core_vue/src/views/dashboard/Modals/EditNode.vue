<template>
  <b-modal title="Edit Node" v-model="myModal" @ok="handleOk" @cancel="handleCancel">
    <div v-if="selectedNode.hasOwnProperty('elem')">

      <strong>Node Type</strong>
      <template v-for='(lib, key1) in selectedNode.elem.data.info'>
        
        <b-form-group
          :label="key1"
          label-for="radios"
          :label-cols="3"
          :horizontal="true">
          <!-- <div v-for='func in lib.name' class="custom-control custom-radio custom-control-inline"> -->
              <b-form-radio-group
                id="radios"
                name="funcRadios">
                <div v-for='func in lib.name' class="custom-control custom-radio custom-control-inline">
                  <input type="radio" :id=func name="funcRadios" class="custom-control-input" :value=func v-on:click="handleFuncChange(key1,func, lib.functions[lib.name.indexOf(func)])">
                  <label class="custom-control-label" for="radiosInline">{{func}}</label>
                </div>
              </b-form-radio-group>
          <!-- </div> -->
        </b-form-group>
      </template>

      <!-- 
      <div class="row">
      <div class="col-sm-6">
        <b-button :class=btnclass1  v-on:click="handleBtnClick(1)">Use Class Object Instance</b-button>
      </div>
      <div class="col-sm-6">
        <b-button :class=btnclass2   v-on:click="handleBtnClick(2)">Use Class Method Function</b-button>
      </div>
      </div> -->

      <!-- <div v-if='!selec2ted'> -->
        <strong v-if='meths !==undefined'>Select Class Method</strong>
        <template v-for='param in meths'>
          <b-form-radio-group
          id="radiosmeths"
          name="methRadios">
           <input type="radio" :id=param name="methRadios" :value=param v-on:click="handleMethChange(param)">
           <label class="custom-control-label" for="radiosInline">{{param}}</label>
          </b-form-radio-group>
        </template>
        <br/>

        <div v-if='fparams.length>0'>
          <button class='btn btn-success'  v-on:click="isHidden = !isHidden">Click to Set Base Parameter Values</button>
          <b-button class='btn btn-outline-info'   v-on:click="isHidden2 = !isHidden2"><i class="fa fa-question"></i></b-button>
        </div>
      <!-- </div> -->
          
            
          
          <template v-if='!isHidden' v-for='param in fparams'>
            <b-form-group>
              <dl class="row">
                <dt class="col-sm-4 ">
                  <div v-if='!param.is_optional' class='form-group required'>
                    <label :for=param.name class='control-label'>{{param.name}}</label>
                  </div>
                  <div v-else>
                    <label :for=param.name>{{param.name}}</label>
                  </div>
                </dt>
                <dd class="col-sm-7">
                  <div class='alert alert-light' v-if='!isHidden2'>
                    {{param.desc}}
                  </div>
                </dd>
                <dd class="col-sm-12">
                  <b-form-file v-if="param.name === 'filepath_or_buffer'" :id=param.name placeholder="Enter Value" v-model="param.value"></b-form-file>
                  <b-form-input type="text" v-else :id=param.name placeholder="Enter Value" v-model="param.value"></b-form-input>
                </dd>
              </dl>
            </b-form-group>
          </template>
    </div>

  </b-modal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'
// import $ from 'jquery'

export default {
  name: 'editNode',
  data () {
    return {
      host: '',
      func: '',
      funcm: '',
      funcminputs: [],
      funcmoutputs: [],
      meths: [],
      wparams: [],
      isHidden: true,
      isHidden2: true,
      selec2ted: true,
      btnclass1: 'btn btn-outline-primary',
      btnclass2: 'btn btn-outline-primary',
      fparams: []
    }
  },
  computed: {
    ...mapGetters({
      visible: 'editNodeVisible',
      selectedNode: 'selectedNode',
      funcMeta: 'funcMeta',
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
      show: 'showEditNode',
      hide: 'hideEditNode',
      resetSelectedNode: 'resetSelectedNode'
    }),
    handleFuncChange: function (host, func, meths) {
      this.host = host
      this.func = func
      this.meths = meths
      this.isHidden = true
      this.isHidden2 = true
      this.wparams = _.cloneDeep(this.funcMeta[func].WParameters)
      this.fparams = _.cloneDeep(this.funcMeta[func].FParameters)
      if (this.meths === undefined) {
        this.meths = ['data', 'obj']
      }
      console.log('funchange', host, func, meths)
      console.log('funchange', this.host, this.func, this.meths)
      console.log('funchange', this.funcMeta[func])
    },
    // handleBtnClick: function (param) {
    //   console.log('In btnclcik', param, this.func)
    //   console.log(this.funcMeta[this.func]['Methods'][param])
    //   if (param === 1) {
    //     this.selec2ted = true
    //     this.isHidden = true
    //     this.isHidden2 = true
    //     this.funcm = 'obj'
    //     this.funcmoutputs = this.fparams
    //     this.funcminputs = []

    //     this.btnclass1 = 'btn btn-success'
    //     this.btnclass2 = 'btn btn-outline-primary'
    //   } else {
    //     this.selec2ted = false
    //     this.btnclass2 = 'btn btn-success'
    //     this.btnclass1 = 'btn btn-outline-primary'
    //   }
    // },
    handleMethChange: function (param) {
      console.log('In methchange', param, this.func)
      console.log(this.funcMeta[this.func]['Methods'][param])
      if (param === 'obj') {
        this.funcm = 'obj'
        this.funcmoutputs = [{'name': 'obj'}] // this.fparams
        this.funcminputs = [{'name': 'obj'}] // this.fparams
      } else {
        this.funcm = param
        this.funcmoutputs = _.cloneDeep(this.funcMeta[this.func]['Methods'][param]['outputs'])
        this.funcminputs = _.cloneDeep(this.funcMeta[this.func]['Methods'][param]['inputs'])
      }
      console.log(this.funcminputs, this.funcmoutputs)
    },
    handleOk: function () {
      let node = this.selectedNode
      node.elem.data.params = {wparams: this.wparams, fparams: this.fparams, meths: this.meths, funcm: this.funcm, inp: this.funcminputs, op: this.funcmoutputs}
      node.elem.data.func = this.func
      node.elem.data.host = this.host
      this.cy.add(node.elem)

      this.hide()
      this.resetSelectedNode()
    },
    handleCancel: function () {
      this.hide()
      this.resetSelectedNode()
    }
  },
  watch: {
    // whenever question changes, this function will run
    selectedNode: function (newVal, oldVal) {
      if (this.selectedNode.hasOwnProperty('elem')) {
        if (this.selectedNode.elem.data.hasOwnProperty('params')) {
          this.func = this.selectedNode.elem.data.func
          this.funcm = this.selectedNode.elem.data.params.funcm
          console.log('selected node data', this.selectedNode.elem.data)
          setTimeout(function () {
          // alert(this.func)
            let ele = document.getElementById(this.func)
            ele.checked = true
            let ele2 = document.getElementById(this.funcm)
            ele2.checked = true
          }.bind(this), 500)
          this.wparams = this.selectedNode.elem.data.params.wparams
          this.fparams = this.selectedNode.elem.data.params.fparams
          this.meths = this.selectedNode.elem.data.params.meths
        }
      } else {
        this.func = ''
        this.funcm = ''
        this.wparams = []
        this.fparams = []
        this.meths = []
      }
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
