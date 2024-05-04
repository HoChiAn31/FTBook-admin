import BookPage from '../Pages/Book/Book';
import BookAddPage from '../Pages/Book/BookAdd';
import BookEditPage from '../Pages/Book/BookEdit';
import BookCategoryPage from '../Pages/BookCategory/BookCategory';
import BookCategoryAddPage from '../Pages/BookCategory/BookCategoryAdd';
import BookCategoryEditPage from '../Pages/BookCategory/BookCategoryEdit';
import BookCategoryDetailPage from '../Pages/BookCategoryDetail/BookCategoryDetail';
import BookCategoryDetailEditPage from '../Pages/BookCategoryDetail/BookCategoryDetailEdit';
import ChartPage from '../Pages/Chart';
import HomePage from '../Pages/Home';
import MessengerPage from '../Pages/Messenger';
import PublishCategoryPage from '../Pages/PublishCategory/PublishCategory';
import PublishCategoryPageAdd from '../Pages/PublishCategory/PublishCategoryAdd';
import PublishCategoryPageEdit from '../Pages/PublishCategory/PublishCategoryEdit';

import SuppliersCategoryPage from '../Pages/SuppliersCategory/SuppliersCategory';
import SuppliersCategoryPageAdd from '../Pages/SuppliersCategory/SuppliersCategoryAdd';
import SuppliersCategoryPageEdit from '../Pages/SuppliersCategory/SuppliersCategoryEdit';

import TheOrderPage from '../Pages/TheOrder';
import UserPage from '../Pages/User';
import config from '../config/index';

const publicRoutes = [
    { path: config.home, component: HomePage },
    { path: config.book, component: BookPage },
    { path: config.bookAdd, component: BookAddPage },
    { path: config.bookEdit, component: BookEditPage },
    { path: config.bookCategory, component: BookCategoryPage },
    { path: config.bookCategoryAdd, component: BookCategoryAddPage },
    { path: config.bookCategoryEdit, component: BookCategoryEditPage },
    { path: config.bookCategoryDetail, component: BookCategoryDetailPage },
    { path: config.bookCategoryDetailAdd, component: BookCategoryDetailPage },
    { path: config.bookCategoryDetailEdit, component: BookCategoryDetailEditPage },
    { path: config.chart, component: ChartPage },
    { path: config.messenger, component: MessengerPage },
    { path: config.publishCategory, component: PublishCategoryPage },
    { path: config.publishCategoryAdd, component: PublishCategoryPageAdd },
    { path: config.publishCategoryEdit, component: PublishCategoryPageEdit },
    { path: config.suppliersCategory, component: SuppliersCategoryPage },
    { path: config.suppliersCategoryAdd, component: SuppliersCategoryPageAdd },
    { path: config.suppliersCategoryEdit, component: SuppliersCategoryPageEdit },
    { path: config.theOrder, component: TheOrderPage },
    { path: config.user, component: UserPage },
];
export { publicRoutes };
