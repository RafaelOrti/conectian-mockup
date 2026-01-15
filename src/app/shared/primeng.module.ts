/**
 * PrimeNG Shared Module
 * Centraliza todos los imports de componentes PrimeNG para uso en toda la aplicación
 * Importar este módulo en cualquier componente standalone que necesite PrimeNG
 */

// Button Components
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';

// Form Components
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ChipsModule } from 'primeng/chips';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PasswordModule } from 'primeng/password';
import { EditorModule } from 'primeng/editor';

// Data Display Components
import { TableModule } from 'primeng/table';
import { DataViewModule } from 'primeng/dataview';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { PaginatorModule } from 'primeng/paginator';
import { TimelineModule } from 'primeng/timeline';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ChipModule } from 'primeng/chip';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { KnobModule } from 'primeng/knob';

// Panel Components
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { ScrollPanelModule } from 'primeng/scrollpanel';

// Overlay Components
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

// Menu Components
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PanelMenuModule } from 'primeng/panelmenu';

// Chart (requires chart.js - install if needed)
import { ChartModule } from 'primeng/chart';

// Messages Components
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

// Media Components
import { ImageModule } from 'primeng/image';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';

// Misc Components
import { RippleModule } from 'primeng/ripple';
import { ScrollTopModule } from 'primeng/scrolltop';
import { BlockUIModule } from 'primeng/blockui';
import { DragDropModule } from 'primeng/dragdrop';
import { FocusTrapModule } from 'primeng/focustrap';

// File Upload
import { FileUploadModule } from 'primeng/fileupload';

// Services
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

/**
 * Array de todos los módulos de PrimeNG para importar en componentes standalone
 * Uso: imports: [...PRIMENG_MODULES]
 */
export const PRIMENG_MODULES = [
  // Buttons
  ButtonModule,
  SplitButtonModule,
  SpeedDialModule,

  // Forms
  InputTextModule,
  InputTextareaModule,
  InputNumberModule,
  DropdownModule,
  MultiSelectModule,
  CalendarModule,
  CheckboxModule,
  RadioButtonModule,
  InputSwitchModule,
  SliderModule,
  RatingModule,
  ChipsModule,
  AutoCompleteModule,
  PasswordModule,
  EditorModule,

  // Data Display
  TableModule,
  DataViewModule,
  TreeModule,
  TreeTableModule,
  PaginatorModule,
  TimelineModule,
  TagModule,
  BadgeModule,
  AvatarModule,
  AvatarGroupModule,
  ChipModule,
  ProgressBarModule,
  ProgressSpinnerModule,
  SkeletonModule,
  KnobModule,

  // Panels
  CardModule,
  AccordionModule,
  TabViewModule,
  PanelModule,
  FieldsetModule,
  ToolbarModule,
  DividerModule,
  SplitterModule,
  ScrollPanelModule,

  // Overlays
  DialogModule,
  OverlayPanelModule,
  SidebarModule,
  TooltipModule,
  ConfirmDialogModule,
  ConfirmPopupModule,

  // Menus
  MenuModule,
  MenubarModule,
  MegaMenuModule,
  BreadcrumbModule,
  StepsModule,
  TabMenuModule,
  TieredMenuModule,
  ContextMenuModule,
  PanelMenuModule,

  // Charts
  ChartModule,

  // Messages
  ToastModule,
  MessagesModule,
  MessageModule,

  // Media
  ImageModule,
  CarouselModule,
  GalleriaModule,

  // Misc
  RippleModule,
  ScrollTopModule,
  BlockUIModule,
  DragDropModule,
  FocusTrapModule,

  // File
  FileUploadModule
];

/**
 * Proveedores de servicios de PrimeNG
 * Añadir a los providers del componente o app.config.ts
 */
export const PRIMENG_PROVIDERS = [
  MessageService,
  ConfirmationService
];
