import { type } from 'os';
import {IconLayoutDashboard, IconHistory, IconSettings2, IconAddressBook} from '@tabler/icons-react';

export const MainPages =  
    [
    {
        "name":"Dashboard",
        "icon": IconLayoutDashboard ,
        "location":"/"
    },
    {
        "name":"Patients",
        "icon":IconAddressBook,
        "location":"/patients"
    },
    {
        "name":"History",
        "icon": IconHistory,
        "location":"/history"
    },
]
export type MainPagesType = typeof MainPages