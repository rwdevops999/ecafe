import packageJson from "../../../package.json"
import { Album, Binoculars, Blocks, BookOpenText, Braces, Calendar1, Clock3, Coffee, ContactRound, Database, Globe, History, LampDesk, Languages, Lock, MessageSquare, ServerCog, Settings2, Store, TestTube, Truck, User, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import NavHeader from "./nav-header";
import NavTools from "./nav-tools";
import NavServices from "./nav-services";
import { log } from "@/lib/utils";
import NavResources from "./nav-resources";
import NavUser from "./nav-user";
import { SidebarType } from "@/data/navigation-scheme";
import ToolsTheme from "./tools-theme";
import ToolsTime from "./tools-time";
import ToolsLanguage from "./tools-language";

const data: SidebarType = {
};

data.Header = {
    name: `ecafé v_${packageJson.version}`,
    logo: Coffee,
    url: '/dashboard'
};

data.User = {
    name: 'ecafé',
    email: 'rwdevops999@&gmail.com',
    avatar: '/avatars/rw.png'
};

data.Services = [];

data.Services.push(
    {
        id: 0,
        tkey: 'stock',
        url: '#',
        icon: Truck,
        children: [
            {
                tkey: 'overview',
                url: '#'
            },
            {
                tkey: 'orders',
                url: '#'
            },
            {
                tkey: 'deliveries',
                url: '#'
            },
            {
                tkey: 'collects',
                url: '#'
            },
            {
                tkey: 'import',
                url: '#'
            },
            {
                tkey: 'export',
                url: '#'
            },
        ]
    }
);

data.Services.push(
    {
        id: 1,
        tkey: 'contacts',
        url: '#',
        icon: ContactRound,
        children: [
            {
                tkey: 'providers',
                url: '#'
            },
            {
                tkey: 'customers',
                url: '#'
            },
            {
                tkey: 'employees',
                url: '#'
            },
            {
                tkey: 'others',
                url: '#'
            },
        ]
    }
);

data.Services.push(    
    {
        id: 2,
        tkey: 'messages',
        url: '#',
        icon: MessageSquare,
        children: [
            {
                tkey: 'notifications',
                url: '#'
            },
            {
                tkey: 'mails',
                url: '#'
            },
            {
                tkey: 'chat',
                url: '#'
            },
        ]
    }
);

data.Services.push(    
    {
        id: 3,
        tkey: 'documents',
        url: '#',
        icon: BookOpenText,
        children: [
            {
                tkey: 'upload',
                url: '#'
            },
            {
                tkey: 'download',
                url: '#'
            },
            {
                tkey: 'tickets',
                url: '#'
            },
            {
                tkey: 'overview',
                url: '#'
            },
            {
                tkey: 'search',
                url: '#'
            },
        ]
    }
);

data.Services.push(    
    {
        id: 4,
        tkey: 'logistics',
        url: '#',
        icon: Store,
        children: [
            {
                tkey: 'website',
                url: '#'
            },
            {
                tkey: 'leaflets',
                url: '#'
            },
            {
                tkey: 'promos',
                url: '#'
            },
            {
                tkey: 'materials',
                url: '#'
            },
        ]
    }
);

data.Services.push(    
    {
        id: 5,
        tkey: 'history',
        url: '#',
        icon: History,
    }
);

data.Services.push(    
    {
        id: 6,
        tkey: 'meetings',
        url: '#',
        icon: Calendar1,
    }
);

data.Services.push(    
    {
        id: 7,
        tkey: 'test',
        url: '/testing',
        icon: TestTube,
    }
);

data.Resources = [];

data.Resources.push(
    {
        tkey: 'access',
        url: '#',
        icon: Lock,
        children: [
            {
                tkey: 'groups',
                icon: Users,
                url: "/iam/groups",
            },
            {
                tkey: 'users',
                icon: User,
                url: "/iam/users",
            },
            {
                tkey: 'roles',
                icon: Blocks,
                url: "/iam/roles",
            },
            {
                tkey: 'policies',
                icon: Binoculars,
                url: "/iam/policies/policy=*",
            },
            {
                tkey: 'statements',
                icon: Album,
                url: "/iam/statements/service=*&sid=*",
            },
            {
                tkey: 'services',
                icon: ServerCog,
                url: "/iam/services/service=*",
            },
        ]        
    }
)

data.Resources.push(
    {
        tkey: 'settings',
        url: '#',
        icon: Settings2,
        children: [
            {
                tkey: 'general',
                icon: Globe,
                url: "#",
            },
            {
                tkey: 'storage',
                icon: Database,
                url: "#",
            },
            {
                tkey: 'limits',
                icon: Braces,
                url: "#",
            },
        ]        
    }
)

data.Tools = [];

data.Tools.push(
    {
        id: 0,
        tkey: 'theme',
        icon: LampDesk,
        child: <ToolsTheme />
    }
)

data.Tools.push(
    {
        id: 1,
        tkey: 'time',
        icon: Clock3,
        child: <ToolsTime />
    }
)

data.Tools.push(
    {
        id: 2,
        tkey: 'languages',
        icon: Languages,
        child: <ToolsLanguage />
    }
)

const AppSidebar = () => {
    const renderComponent = () => {
        return (
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <NavHeader header={data.Header!} />
                </SidebarHeader>
                <SidebarContent>
                <></>
                    <NavTools tkey="tools" tools={data.Tools!}></NavTools>
                    <NavServices tkey="services" services={data.Services!}></NavServices>
                    <NavResources tkey="managemenent" resources={data.Resources!}></NavResources>
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={data.User!} />
                </SidebarFooter>
            </Sidebar>
        );
    }

    return(<>{renderComponent()}</>);
}

export default AppSidebar;