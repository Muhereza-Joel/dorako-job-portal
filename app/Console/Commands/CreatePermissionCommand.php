<?php

namespace App\Console\Commands;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Console\Command;

class CreatePermissionCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:permission {permission} {--role=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a permission and assign it to a role';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $permissionName = $this->argument('permission');
        $roleName = $this->option('role');

        // Create or find the permission
        $permission = Permission::firstOrCreate(['name' => $permissionName]);

        $this->info("Permission '{$permissionName}' created successfully.");

        // If a role is specified, assign the permission to the role
        if ($roleName) {
            $role = Role::where('name', $roleName)->first();

            if (!$role) {
                $this->error("Role '{$roleName}' not found.");
                return;
            }

            $role->givePermissionTo($permission);
            $this->info("Permission '{$permissionName}' assigned to role '{$roleName}'.");
        }
    }
}
