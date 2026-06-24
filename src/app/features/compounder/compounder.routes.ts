import { Route, Routes } from "@angular/router";
import { Compounder } from "./pages/compounder/compounder";
import { coordinatorGuard } from "../../guards/coordinator-guard";

export const compounderRoutes : Routes = [
  {
    path : '',
    // canActivate : [coordinatorGuard],
    component : Compounder
  }
]