/* eslint-disable @typescript-eslint/ban-ts-comment */

import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import AutoComplete from 'primevue/autocomplete'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Badge from 'primevue/badge'
import BadgeDirective from 'primevue/badgedirective'
import BlockUI from 'primevue/blockui'
import Breadcrumb from 'primevue/breadcrumb'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import CascadeSelect from 'primevue/cascadeselect'
import Chart from 'primevue/chart'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import Chips from 'primevue/chips'
import ColorPicker from 'primevue/colorpicker'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup'
import ContextMenu from 'primevue/contextmenu'
import DataTable from 'primevue/datatable'
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import DeferredContent from 'primevue/deferredcontent'
import Dialog from 'primevue/dialog'
import DialogService from 'primevue/dialogservice'
import Divider from 'primevue/divider'
import Dock from 'primevue/dock'
import Dropdown from 'primevue/dropdown'
import DynamicDialog from 'primevue/dynamicdialog'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import FocusTrap from 'primevue/focustrap'
import Galleria from 'primevue/galleria'
import Image from 'primevue/image'
import InlineMessage from 'primevue/inlinemessage'
import Inplace from 'primevue/inplace'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import Knob from 'primevue/knob'
import Listbox from 'primevue/listbox'
import MegaMenu from 'primevue/megamenu'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import MultiSelect from 'primevue/multiselect'
import OrderList from 'primevue/orderlist'
import OrganizationChart from 'primevue/organizationchart'
import OverlayPanel from 'primevue/overlaypanel'
import Paginator from 'primevue/paginator'
import Panel from 'primevue/panel'
import PanelMenu from 'primevue/panelmenu'
import Password from 'primevue/password'
import PickList from 'primevue/picklist'
import ProgressBar from 'primevue/progressbar'
import ProgressSpinner from 'primevue/progressspinner'
import RadioButton from 'primevue/radiobutton'
import Rating from 'primevue/rating'
import Ripple from 'primevue/ripple'
import Row from 'primevue/row'
import ScrollPanel from 'primevue/scrollpanel'
import ScrollTop from 'primevue/scrolltop'
import SelectButton from 'primevue/selectbutton'
import Sidebar from 'primevue/sidebar'
import Skeleton from 'primevue/skeleton'
import Slider from 'primevue/slider'
import SpeedDial from 'primevue/speeddial'
import SplitButton from 'primevue/splitbutton'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Steps from 'primevue/steps'
import StyleClass from 'primevue/styleclass'
import TabMenu from 'primevue/tabmenu'
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'
import Tag from 'primevue/tag'
import Terminal from 'primevue/terminal'
import Textarea from 'primevue/textarea'
import TieredMenu from 'primevue/tieredmenu'
import Timeline from 'primevue/timeline'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ToggleButton from 'primevue/togglebutton'
import Toolbar from 'primevue/toolbar'
import Tooltip from 'primevue/tooltip'
import Tree from 'primevue/tree'
import TreeSelect from 'primevue/treeselect'
import TreeTable from 'primevue/treetable'
import TriStateCheckbox from 'primevue/tristatecheckbox'
import VirtualScroller from 'primevue/virtualscroller'
import { createApp } from 'vue'
// @ts-ignore
import YmapPlugin from 'vue-yandex-maps'

import { MAP_OPTIONS } from 'shared/config'

import { router, store } from './providers'

import App from './index.vue'

import './index.scss'

import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/tailwind-light/theme.css'

/**
 * Application create
 */
export const app = createApp(App)
	// Uses
	.use(store)
	.use(router)
	.use(PrimeVue, { ripple: true })
	.use(ConfirmationService)
	.use(DialogService)
	.use(ToastService)
	.use(YmapPlugin, MAP_OPTIONS)

	// Directives
	.directive('tooltip', Tooltip)
	.directive('badge', BadgeDirective)
	.directive('ripple', Ripple)
	.directive('styleclass', StyleClass)
	.directive('focustrap', FocusTrap)

	// Components
	.component('Accordion', Accordion)
	.component('AccordionTab', AccordionTab)
	.component('AutoComplete', AutoComplete)
	.component('Avatar', Avatar)
	.component('AvatarGroup', AvatarGroup)
	.component('Badge', Badge)
	.component('BlockUI', BlockUI)
	.component('Breadcrumb', Breadcrumb)
	.component('Button', Button)
	.component('Calendar', Calendar)
	.component('Card', Card)
	.component('Carousel', Carousel)
	.component('CascadeSelect', CascadeSelect)
	.component('Checkbox', Checkbox)
	.component('Chip', Chip)
	.component('Chips', Chips)
	.component('ColorPicker', ColorPicker)
	.component('Column', Column)
	.component('ColumnGroup', ColumnGroup)
	.component('ConfirmDialog', ConfirmDialog)
	.component('ConfirmPopup', ConfirmPopup)
	.component('ContextMenu', ContextMenu)
	.component('DataTable', DataTable)
	.component('DataView', DataView)
	.component('DataViewLayoutOptions', DataViewLayoutOptions)
	.component('DeferredContent', DeferredContent)
	.component('Dialog', Dialog)
	.component('Divider', Divider)
	.component('Dock', Dock)
	.component('Dropdown', Dropdown)
	.component('DynamicDialog', DynamicDialog)
	.component('Fieldset', Fieldset)
	.component('FileUpload', FileUpload)
	.component('Galleria', Galleria)
	.component('Image', Image)
	.component('InlineMessage', InlineMessage)
	.component('Inplace', Inplace)
	.component('InputMask', InputMask)
	.component('InputNumber', InputNumber)
	.component('InputSwitch', InputSwitch)
	.component('InputText', InputText)
	.component('Knob', Knob)
	.component('Listbox', Listbox)
	.component('MegaMenu', MegaMenu)
	.component('Menu', Menu)
	.component('Menubar', Menubar)
	.component('Message', Message)
	.component('MultiSelect', MultiSelect)
	.component('OrderList', OrderList)
	.component('OrganizationChart', OrganizationChart)
	.component('OverlayPanel', OverlayPanel)
	.component('Paginator', Paginator)
	.component('Panel', Panel)
	.component('PanelMenu', PanelMenu)
	.component('Password', Password)
	.component('PickList', PickList)
	.component('ProgressBar', ProgressBar)
	.component('ProgressSpinner', ProgressSpinner)
	.component('RadioButton', RadioButton)
	.component('Rating', Rating)
	.component('Row', Row)
	.component('SelectButton', SelectButton)
	.component('ScrollPanel', ScrollPanel)
	.component('ScrollTop', ScrollTop)
	.component('Slider', Slider)
	.component('Sidebar', Sidebar)
	.component('Skeleton', Skeleton)
	.component('SpeedDial', SpeedDial)
	.component('SplitButton', SplitButton)
	.component('Splitter', Splitter)
	.component('SplitterPanel', SplitterPanel)
	.component('Steps', Steps)
	.component('TabMenu', TabMenu)
	.component('TabView', TabView)
	.component('TabPanel', TabPanel)
	.component('Tag', Tag)
	.component('Textarea', Textarea)
	.component('Terminal', Terminal)
	.component('TieredMenu', TieredMenu)
	.component('Timeline', Timeline)
	.component('Toast', Toast)
	.component('Toolbar', Toolbar)
	.component('ToggleButton', ToggleButton)
	.component('Tree', Tree)
	.component('TreeSelect', TreeSelect)
	.component('TreeTable', TreeTable)
	.component('TriStateCheckbox', TriStateCheckbox)
	.component('VirtualScroller', VirtualScroller)
	.component('Chart', Chart)
