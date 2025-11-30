import { routes } from "@/constants/routeConstants";
import NavbarButton from "./NavbarButton";
import { cn } from "@/lib/utils";

function NavbarDesktop() {
  return (
    <aside
      className={cn("bg-sidebar absolute left-0 min-h-screen  inline-flex")}
    >
      <nav className="mt-30 pt-5 px-3 h-full border-t-2 flex flex-col gap-4">
        {routes.map((route) => {
          const { ariaLabel, actionText, id, Icon, path } = route;
          return (
            <NavbarButton
              key={id}
              ariaLabel={ariaLabel}
              path={path}
              activeClassName="bg-sidebar-accent"
              className="rounded-2xl pl-5 pr-20 py-3 transition-colors duration-300 ease-in-out"
            >
              <Icon />
              <span>{actionText}</span>
            </NavbarButton>
          );
        })}
      </nav>
    </aside>
  );
}

export default NavbarDesktop;
